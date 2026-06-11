import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GOLD = '#e0b252'

/** Soft radial sprite so motes render as round glows — raw GL_POINTS are squares,
 *  and any square large enough to be seen reads as a rendering glitch. */
function makeMoteSprite(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.5)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/** A slow field of drifting gold motes — the ambient "infinite" backdrop. */
function Motes({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const sprite = useMemo(makeMoteSprite, [])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // The field spins about the Y axis, so each mote orbits on a circle of
      // radius r = √(x²+z²) — a safe camera distance must hold at EVERY angle,
      // not just the initial one. Min distance over a revolution is |r − 6|
      // (camera at z=6), so a cylindrical shell with r ∈ [9, 17] keeps every
      // mote ≥ 3 units from the lens forever (worst case ≈ 6px, soft + round).
      // Never use a box distribution here: motes with r ≈ 6 eventually drift
      // onto the lens and render as huge squares over the content.
      const angle = Math.random() * Math.PI * 2
      const radius = 9 + Math.random() * 8
      arr[i * 3] = Math.cos(angle) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        map={sprite}
        color={GOLD}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Site-wide ambient particle field — the only 3D effect. Lazy-loaded, desktop-only. */
export default function ParticleField() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <Motes />
    </Canvas>
  )
}

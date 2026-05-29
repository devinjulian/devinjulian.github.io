import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const GOLD = '#e0b252'
const SIGNAL = '#5bb89e'

// Fresnel rim-glow — premium halo without textures or lights.
const VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
    gl_FragColor = vec4(uColor, f * uIntensity);
  }
`

/** Beat 1 — the infinite: a slow field of drifting motes. */
function Particles({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
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

function Scene({ progress }: { progress: React.RefObject<number> }) {
  const orb = useRef<THREE.Group>(null)
  const nodes = useRef<THREE.Group>(null)
  const { camera } = useThree()

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(GOLD) },
      uIntensity: { value: 1.0 },
    }),
    [],
  )

  useFrame((_, dt) => {
    const p = progress.current ?? 0
    const k = Math.min(1, dt * 1.8) // smoothing factor

    // Camera: gentle dolly back + drift down as the narrative resolves (beat 4).
    camera.position.z += (6 + p * 2.2 - camera.position.z) * k
    camera.position.y += (-p * 1.4 - camera.position.y) * k
    camera.lookAt(0, 0, 0)

    // Time-orb: rotates always; depletes (shrinks + dims) through beats 1→2.
    if (orb.current) {
      orb.current.rotation.y += dt * 0.16
      orb.current.rotation.x += dt * 0.05
      const deplete = THREE.MathUtils.clamp(1 - (p - 0.08) / 0.5, 0.4, 1)
      orb.current.scale.setScalar(deplete)
    }
    uniforms.uIntensity.value = THREE.MathUtils.clamp(1.3 - p * 1.2, 0.25, 1.3)

    // Three nodes: scale in around beat 3, orbiting the center.
    if (nodes.current) {
      nodes.current.rotation.y += dt * 0.38
      const s = THREE.MathUtils.clamp((p - 0.45) / 0.3, 0, 1)
      nodes.current.scale.setScalar(s)
      nodes.current.visible = s > 0.01
    }
  })

  return (
    <>
      <Particles />

      <group ref={orb}>
        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.35} />
        </mesh>
        <mesh scale={1.4}>
          <sphereGeometry args={[1.25, 48, 48]} />
          <shaderMaterial
            uniforms={uniforms}
            vertexShader={VERT}
            fragmentShader={FRAG}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={nodes} visible={false}>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 2.7, Math.sin(a) * 0.7, Math.sin(a) * 2.7]}>
              <sphereGeometry args={[0.13, 18, 18]} />
              <meshBasicMaterial color={i === 1 ? SIGNAL : GOLD} />
            </mesh>
          )
        })}
      </group>
    </>
  )
}

export default function Hero3D() {
  const progress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const span = window.innerHeight * 3
      progress.current = span > 0 ? Math.min(window.scrollY / span, 1) : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <Scene progress={progress} />
    </Canvas>
  )
}

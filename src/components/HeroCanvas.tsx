import { Suspense, lazy } from 'react'
import { useEnable3D } from '../lib/useEnable3D'

// Code-split: the three.js / R3F bundle only loads on Home, and only when enabled.
const Hero3D = lazy(() => import('../scenes/Hero3D'))

export function HeroCanvas() {
  const enabled = useEnable3D()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: -5 }}>
      {/* Static poster glow — always present: the fallback for mobile / reduced-motion
          devices and what shows while the 3D chunk streams in. */}
      <div className="absolute top-[26%] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[140px]" />
      {enabled && (
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      )}
    </div>
  )
}

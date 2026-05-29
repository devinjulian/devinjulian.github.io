import { Suspense, lazy } from 'react'
import { useEnable3D } from '../lib/useEnable3D'

// Code-split: three.js loads only on capable desktops, once, behind all content.
const ParticleField = lazy(() => import('../scenes/ParticleField'))

/** Site-wide ambient particle backdrop. Disabled on mobile / reduced-motion /
 *  low-power — those fall back to the CSS atmosphere glow in Layout. */
export function AmbientCanvas() {
  const enabled = useEnable3D()
  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: -5 }}>
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </div>
  )
}

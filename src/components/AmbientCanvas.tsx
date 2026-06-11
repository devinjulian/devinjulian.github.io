import { Suspense, lazy, useEffect, useState } from 'react'
import { useEnable3D } from '../lib/useEnable3D'

// Code-split: three.js loads only on capable desktops, once, behind all content.
const ParticleField = lazy(() => import('../scenes/ParticleField'))

/** Wait for browser idle before mounting, so the ~230KB-gzip three.js chunk never
 *  competes with route chunks and fonts during first load (it's pure decoration). */
function useIdle(): boolean {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    // typeof guard (not `in`): Safari may lack requestIdleCallback at runtime, but
    // lib.dom declares it, so an `in` check narrows the else-branch `window` to never.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = window.setTimeout(() => setIdle(true), 1500)
    return () => window.clearTimeout(t)
  }, [])
  return idle
}

/** Site-wide ambient particle backdrop. Disabled on mobile / reduced-motion /
 *  low-power — those fall back to the CSS atmosphere glow in Layout. */
export function AmbientCanvas() {
  const enabled = useEnable3D()
  const idle = useIdle()
  if (!enabled || !idle) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: -5 }}>
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </div>
  )
}

import type { ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'

/** Lenis smooth scroll for the whole page. Disabled entirely under
 *  prefers-reduced-motion — the page falls back to native scrolling. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}

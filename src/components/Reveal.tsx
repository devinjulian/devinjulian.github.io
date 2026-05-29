import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Fade + lift reveal. `view` triggers when scrolled into view (once);
 *  `mount` plays on load (for above-the-fold hero). Under prefers-reduced-motion
 *  it renders statically with no transform. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  mode = 'view',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  mode?: 'view' | 'mount'
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  const reveal = { opacity: 1, y: 0 }
  const trigger =
    mode === 'mount'
      ? { animate: reveal }
      : {
          whileInView: reveal,
          viewport: { once: true, margin: '0px 0px -12% 0px' },
        }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

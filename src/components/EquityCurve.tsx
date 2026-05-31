import { useRef } from 'react'
import { m, useReducedMotion, useInView } from 'motion/react'
import { cn } from '../lib/cn'

// A fixed, pleasing rising path in a 600×200 viewBox (decorative only — no axes/numbers).
const LINE =
  'M0,182 L40,176 L80,178 L130,150 L180,158 L240,120 L300,128 L360,86 L430,96 L500,52 L560,34 L600,16'
const AREA = `${LINE} L600,200 L0,200 Z`

/** Decorative gold-on-dark equity curve. Always drawn full-length; only a uniform
 *  opacity fade-in is animated (no pathLength/dash, which breaks under the non-uniform
 *  `preserveAspectRatio="none"` stretch). `animate={false}` renders it fully static. */
export function EquityCurve({
  className,
  animate = true,
  uid = 'eq',
}: {
  className?: string
  animate?: boolean
  uid?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const fade = animate && !reduced

  return (
    <m.svg
      ref={ref}
      viewBox="0 0 600 200"
      preserveAspectRatio="none"
      aria-hidden
      className={cn('block h-full w-full', className)}
      initial={fade ? { opacity: 0 } : false}
      animate={{ opacity: fade && !inView ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--color-gold)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={AREA} fill={`url(#${uid}-fill)`} />
      <path
        d={LINE}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </m.svg>
  )
}

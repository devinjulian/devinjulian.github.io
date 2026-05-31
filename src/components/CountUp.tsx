import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, useInView } from 'motion/react'

/** Splits "~12,000%" → { prefix:"~", core:"12,000", suffix:"%" }. */
function parse(value: string) {
  const m = value.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/)
  if (!m) return null
  const [, prefix, core, suffix] = m
  const grouped = core.includes(',')
  const num = parseFloat(core.replace(/,/g, ''))
  if (Number.isNaN(num)) return null
  const dot = core.indexOf('.')
  const decimals = dot === -1 ? 0 : core.length - dot - 1
  return { prefix, suffix, num, grouped, decimals }
}

function format(n: number, decimals: number, grouped: boolean) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  })
}

/** Animates the numeric core of a preformatted string into view, preserving
 *  prefix/suffix, decimals, and grouping. No-op under reduced motion. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const parsed = parse(value)
  const [display, setDisplay] = useState<string | null>(() =>
    parsed && !reduced ? null : value,
  )

  useEffect(() => {
    if (!parsed || reduced || !inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1100
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(
        parsed.prefix +
          format(parsed.num * eased, parsed.decimals, parsed.grouped) +
          parsed.suffix,
      )
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [parsed, reduced, inView])

  return (
    <span ref={ref} className={className}>
      {display ?? value}
    </span>
  )
}

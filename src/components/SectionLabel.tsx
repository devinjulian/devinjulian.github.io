import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/** Editorial eyebrow: an index number, a gold hairline, and a mono label.
 *  The recurring section marker across the site. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {index && (
        <span className="font-mono text-xs text-gold tabular-nums">{index}</span>
      )}
      <span aria-hidden className="h-px w-8 bg-gold/40" />
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">
        {children}
      </span>
    </div>
  )
}

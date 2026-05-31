import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { SectionLabel } from './SectionLabel'

/** Section with a sticky side-rail (index + label + gold tick) on lg+, collapsing
 *  to a label-on-top stack below lg. `side="right"` flips the rail for alternation. */
export function Section({
  index,
  label,
  children,
  side = 'left',
  className,
  id,
}: {
  index?: string
  label: ReactNode
  children: ReactNode
  side?: 'left' | 'right'
  className?: string
  id?: string
}) {
  const rail = (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <SectionLabel index={index}>{label}</SectionLabel>
      <span
        aria-hidden
        className="mt-4 hidden h-12 w-px bg-gradient-to-b from-gold/50 to-transparent lg:block"
      />
    </div>
  )

  return (
    <section
      id={id}
      className={cn(
        'grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12',
        side === 'right' && 'lg:grid-cols-[minmax(0,1fr)_14rem]',
        className,
      )}
    >
      {side === 'left' && rail}
      <div className={cn(side === 'right' && 'lg:order-first')}>{children}</div>
      {side === 'right' && rail}
    </section>
  )
}

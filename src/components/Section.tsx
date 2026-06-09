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
  // Rail is always first in DOM so the label leads on mobile; on lg we use CSS
  // `order` to move it to the right column when side="right".
  return (
    <section
      id={id}
      className={cn(
        'grid gap-6 lg:gap-12',
        side === 'left'
          ? 'lg:grid-cols-[14rem_minmax(0,1fr)]'
          : 'lg:grid-cols-[minmax(0,1fr)_14rem]',
        className,
      )}
    >
      <div
        className={cn(
          'lg:sticky lg:top-28 lg:self-start',
          side === 'right' && 'lg:order-2',
        )}
      >
        <SectionLabel index={index}>{label}</SectionLabel>
        <span
          aria-hidden
          className="mt-4 hidden h-12 w-px bg-gradient-to-b from-gold/50 to-transparent lg:block"
        />
      </div>
      <div className={cn('min-w-0', side === 'right' && 'lg:order-1')}>{children}</div>
    </section>
  )
}

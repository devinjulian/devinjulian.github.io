import { cn } from '../lib/cn'

/** Wordmark stands in for a logo (none supplied — PRD §11.2): a gold diamond
 *  (precision / something precious) beside the name in the display serif. */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-gold" />
      <span className="font-display text-lg leading-none tracking-tight text-ink">
        {compact ? 'ATC' : 'Algo Trading Center'}
      </span>
    </span>
  )
}

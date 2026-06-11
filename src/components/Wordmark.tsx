import { cn } from '../lib/cn'

/** Wordmark: the favicon's two-candle mark (public/favicon.svg — keep the SVGs in
 *  sync, exact colors included) beside the name in the display serif. */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg aria-hidden viewBox="0 0 40 40" className="h-5 w-5 shrink-0">
        <rect width="40" height="40" rx="9" fill="#FFCD42" />
        <rect x="16" y="3" width="3" height="34" fill="#252523" />
        <rect x="22" y="9" width="3" height="22" fill="#252523" />
      </svg>
      <span className="font-display text-lg leading-none tracking-tight text-ink">
        {compact ? 'ATC' : 'Algo Trading Center'}
      </span>
    </span>
  )
}

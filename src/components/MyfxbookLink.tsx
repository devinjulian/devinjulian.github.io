import { links } from '../data'
import { cn } from '../lib/cn'

/** The trust anchor — verifiable live results. Present wherever numbers are quoted (PRD §10). */
export function MyfxbookLink({
  children = 'Live results on Myfxbook',
  className,
}: {
  children?: string
  className?: string
}) {
  return (
    <a
      href={links.myfxbook}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-deep hover:decoration-gold',
        className,
      )}
    >
      {children} ↗
    </a>
  )
}

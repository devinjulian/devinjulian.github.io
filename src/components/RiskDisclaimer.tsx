import { RISK_DISCLAIMER } from '../data'
import { cn } from '../lib/cn'

/** Site-wide risk disclaimer — exact PRD §10 text. Used in the footer and on Pricing/Products. */
export function RiskDisclaimer({ className }: { className?: string }) {
  return (
    <p className={cn('text-xs leading-relaxed text-muted', className)}>
      <span className="font-mono tracking-[0.2em] text-muted uppercase">
        Risk disclaimer —{' '}
      </span>
      {RISK_DISCLAIMER}
    </p>
  )
}

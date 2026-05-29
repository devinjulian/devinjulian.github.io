import { POLYBOT_DISCLAIMER } from '../data'
import { cn } from '../lib/cn'

/** Required disclaimer wherever PolyBot appears (PRD §8/§10). */
export function PolyBotNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'rounded-lg border border-ink/10 bg-void/40 p-3 text-xs leading-relaxed text-muted',
        className,
      )}
    >
      {POLYBOT_DISCLAIMER}
    </p>
  )
}

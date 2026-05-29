import { AI_AGENT_DISCLAIMER } from '../data'
import { cn } from '../lib/cn'

/** Required disclaimer wherever the AI Trading Agent is mentioned (PRD §8 / CLAUDE.md). */
export function AIAgentNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'rounded-lg border border-ink/10 bg-void/40 p-3 text-xs leading-relaxed text-muted',
        className,
      )}
    >
      {AI_AGENT_DISCLAIMER}
    </p>
  )
}

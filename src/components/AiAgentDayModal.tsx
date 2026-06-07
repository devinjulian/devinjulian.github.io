import type { AiAgentSession } from '../data/aiAgentLog'
import { useTypewriter } from '../lib/useTypewriter'
import { cn } from '../lib/cn'
import { Modal } from './Modal'

export function AiAgentDayModal({
  session,
  onClose,
}: {
  session: AiAgentSession | null
  onClose: () => void
}) {
  const typed = useTypewriter(session?.marketInsight ?? '', 12, session !== null)
  if (!session) return null

  const hasSignals = session.signals.length > 0

  return (
    <Modal onClose={onClose} labelledBy="ai-session-title">
      <p className="font-mono text-[0.7rem] tracking-[0.25em] text-gold uppercase">
        AI decision · {session.date}
      </p>
      <h2 id="ai-session-title" className="mt-3 font-display text-3xl font-light text-ink">
        {hasSignals
          ? `${session.signals.length} signal${session.signals.length > 1 ? 's' : ''}`
          : 'No signal'}
      </h2>

      <div className="mt-4 border-l-2 border-gold/40 pl-3">
        <p className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">
          Market read
        </p>
        <p className="mt-1 min-h-[3.5rem] text-sm leading-relaxed text-muted">
          {typed}
          <span className="ml-0.5 animate-pulse text-gold">▍</span>
        </p>
      </div>

      {hasSignals && (
        <div className="mt-6 space-y-4">
          {session.signals.map((sig) => (
            <div key={sig.asset} className="rounded-xl border border-ink/10 bg-void/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg text-ink">
                  {sig.direction} <span className="text-gold">{sig.asset}</span>
                </h3>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.7rem]',
                    sig.outcome === 'profit'
                      ? 'border-signal/40 text-signal'
                      : 'border-warn/40 text-warn',
                  )}
                >
                  {sig.result}
                </span>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10">
                <div className="bg-surface/60 px-4 py-2.5">
                  <dt className="font-mono text-[0.55rem] tracking-[0.2em] text-muted/70 uppercase">
                    Entry
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm text-ink">{sig.entry}</dd>
                </div>
                <div className="bg-surface/60 px-4 py-2.5">
                  <dt className="font-mono text-[0.55rem] tracking-[0.2em] text-muted/70 uppercase">
                    Stop loss
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm text-ink">{sig.stopLoss}</dd>
                </div>
              </dl>

              <p className="mt-2 font-mono text-[0.7rem] text-muted">
                Targets {sig.takeProfit}
                {sig.leverage ? ` · Leverage ${sig.leverage}` : ''}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted">{sig.reason}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}

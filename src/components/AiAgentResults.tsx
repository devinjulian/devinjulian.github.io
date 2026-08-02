import { useState } from 'react'
import { AI_AGENT_SAMPLE, aiAgentLog, type AiAgentSession } from '../data/aiAgentLog'
import { SignalCalendar } from './SignalCalendar'
import { AiAgentDayModal } from './AiAgentDayModal'

/** The AI Trading Agent's public results log — an LP-style monthly calendar.
 *  Each logged day is a tappable cell ("view the AI decision" → day modal);
 *  values are net R-multiples per day, never $/% profit (PRD §8). */
export function AiAgentResults() {
  const [active, setActive] = useState<AiAgentSession | null>(null)

  if (aiAgentLog.length === 0) {
    return <p className="text-sm text-muted">Results will appear here as sessions are logged.</p>
  }

  return (
    <div>
      {AI_AGENT_SAMPLE && (
        <p className="mb-6 rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-xs leading-relaxed text-warn">
          Sample data shown for layout only — these are illustrative placeholders, not real
          results. Real results will replace them.
        </p>
      )}

      <div className="rounded-2xl border border-ink/10 bg-surface/30 p-4 sm:p-6">
        <SignalCalendar
          sessions={aiAgentLog}
          caption="AI Trading Agent daily results log — one cell per day showing the session's net R-multiple, a dash for no-signal days."
          hint="Tap a highlighted day for the full AI decision"
          emptyNote="New month — the first logged session will appear here."
          onView={setActive}
        />
      </div>

      {/* Weekend cells are always empty by design — said out loud so the gaps don't read
          as missing entries. */}
      <p className="mt-4 font-mono text-[0.7rem] leading-relaxed tracking-wide text-muted/80">
        The Agent works Monday to Friday — it does not analyse or issue signals on Saturdays
        and Sundays, so weekend cells stay empty.
      </p>

      <AiAgentDayModal session={active} onClose={() => setActive(null)} />
    </div>
  )
}

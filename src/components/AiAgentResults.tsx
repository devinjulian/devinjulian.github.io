import { useState } from 'react'
import {
  AI_AGENT_SAMPLE,
  aiAgentLog,
  availableYears,
  monthsForYear,
  entriesFor,
  tallyFor,
  latestPeriod,
  MONTH_NAMES,
  type AiAgentSession,
} from '../data/aiAgentLog'
import { Check, Dash, Close } from './icons'
import { AiAgentDayModal } from './AiAgentDayModal'

const localDate = (date: string): Date => {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const weekday = (date: string) => localDate(date).toLocaleDateString('en-GB', { weekday: 'long' })
const dateLabel = (date: string) =>
  localDate(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const selectClass =
  'rounded-lg border border-ink/15 bg-surface/60 px-3 py-2 font-mono text-xs text-ink uppercase tracking-[0.1em] transition-colors hover:border-gold/50 focus:border-gold focus:outline-none'

/** At-a-glance result summary for a session: counts of profit / stop, or "No signal". */
function SessionResult({ session }: { session: AiAgentSession }) {
  if (session.signals.length === 0) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-gold">
        <Dash size={16} /> No signal
      </span>
    )
  }
  const profit = session.signals.filter((s) => s.outcome === 'profit').length
  const stop = session.signals.filter((s) => s.outcome === 'stoploss').length
  return (
    <span className="inline-flex items-center gap-3 text-sm">
      {profit > 0 && (
        <span className="inline-flex items-center gap-1.5 text-signal">
          <Check size={16} /> {profit}
        </span>
      )}
      {stop > 0 && (
        <span className="inline-flex items-center gap-1.5 text-warn">
          <Close size={16} /> {stop}
        </span>
      )}
      <span className="font-mono text-[0.7rem] text-muted/60">
        {session.signals.length} signal{session.signals.length > 1 ? 's' : ''}
      </span>
    </span>
  )
}

export function AiAgentResults() {
  const years = availableYears()
  const initial = latestPeriod()
  const [year, setYear] = useState(initial.year)
  const [month, setMonth] = useState(initial.month)
  const [active, setActive] = useState<AiAgentSession | null>(null)

  if (aiAgentLog.length === 0) {
    return (
      <p className="text-sm text-muted">Testing results will appear here as the forward test runs.</p>
    )
  }

  const months = monthsForYear(year)
  const safeMonth = months.includes(month) ? month : (months[0] ?? initial.month)
  const rows = [...entriesFor(year, safeMonth)].reverse() // newest day first
  const t = tallyFor(year, safeMonth)

  function onYearChange(y: number) {
    setYear(y)
    const m = monthsForYear(y)
    setMonth(m[m.length - 1] ?? 1)
  }

  return (
    <div>
      {AI_AGENT_SAMPLE && (
        <p className="mb-6 rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-xs leading-relaxed text-warn">
          Sample data shown for layout only — these are illustrative placeholders, not real testing
          results. Real, human-reviewed results will replace them.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="ai-year">
          Year
        </label>
        <select
          id="ai-year"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className={selectClass}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="ai-month">
          Month
        </label>
        <select
          id="ai-month"
          value={safeMonth}
          onChange={(e) => setMonth(Number(e.target.value))}
          className={selectClass}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {MONTH_NAMES[m - 1]}
            </option>
          ))}
        </select>

        <p className="ml-auto font-mono text-xs text-muted">
          {MONTH_NAMES[safeMonth - 1]} {year} · {t.profit + t.stoploss} signals ·{' '}
          <span className="text-signal">{t.profit} profit</span> ·{' '}
          <span className="text-warn">{t.stoploss} stop</span>
          {t.noSignalDays > 0 && (
            <>
              {' '}
              · <span className="text-gold">{t.noSignalDays} no-signal</span>
            </>
          )}
        </p>
      </div>

      <div className="mt-6 max-h-[32rem] overflow-auto rounded-2xl border border-ink/10">
        <table className="w-full min-w-[34rem] text-left">
          <thead>
            <tr className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">
              <th className="sticky top-0 z-10 border-b border-ink/10 bg-surface px-5 py-4 font-normal">
                Day
              </th>
              <th className="sticky top-0 z-10 border-b border-ink/10 bg-surface px-5 py-4 font-normal">
                Date
              </th>
              <th className="sticky top-0 z-10 border-b border-ink/10 bg-surface px-5 py-4 font-normal">
                Result
              </th>
              <th
                className="sticky top-0 z-10 border-b border-ink/10 bg-surface px-5 py-4 font-normal"
                aria-label="Detail"
              />
            </tr>
          </thead>
          <tbody>
            {rows.map((session) => (
              <tr
                key={session.date}
                className="border-b border-ink/5 transition-colors last:border-0 hover:bg-ink/5"
              >
                <td className="px-5 py-4 text-sm text-muted">{weekday(session.date)}</td>
                <td className="px-5 py-4 font-mono text-sm text-ink">{dateLabel(session.date)}</td>
                <td className="px-5 py-4">
                  <SessionResult session={session} />
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => setActive(session)}
                    className="font-mono text-[0.65rem] whitespace-nowrap tracking-[0.15em] text-gold uppercase transition-colors hover:text-gold-deep"
                  >
                    View AI decision →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AiAgentDayModal session={active} onClose={() => setActive(null)} />
    </div>
  )
}

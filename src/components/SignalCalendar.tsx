import { useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { ArrowRight } from './icons'
import { MONTH_NAMES, type AiAgentSession } from '../data/aiAgentLog'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Per-day summary the calendar needs to paint a cell — kind drives the colour. */
type DaySummary =
  | { kind: 'empty' }
  | { kind: 'news' }
  | { kind: 'nosignal' }
  | { kind: 'signals'; count: number; profit: number; loss: number; net: number | null }

function summarize(session: AiAgentSession | undefined): DaySummary {
  if (!session) return { kind: 'empty' }
  if (session.newsHold) return { kind: 'news' }
  if (session.signals.length === 0) return { kind: 'nosignal' }
  const profit = session.signals.filter((s) => s.outcome === 'profit').length
  return {
    kind: 'signals',
    count: session.signals.length,
    profit,
    loss: session.signals.length - profit,
    net: netR(session),
  }
}

/** Pull the R-multiple out of a result string ("Hit TP2 (+2.3R)" → 2.3).
 *  Returns null when the text carries no parsable R — the cell then falls back
 *  to outcome counts, so a wording change can never show a wrong number. */
function parseR(text: string): number | null {
  const m = text.match(/([+\-−]?\d+(?:[.,]\d+)?)\s*R\b/i)
  if (!m) return null
  return Number(m[1].replace('−', '-').replace(',', '.'))
}

/** Net R for a session, or null if empty / any signal is unparsable. */
function netR(session: AiAgentSession): number | null {
  if (session.signals.length === 0) return null
  let sum = 0
  for (const sig of session.signals) {
    const r = parseR(sig.result)
    if (r === null) return null
    sum += r
  }
  return sum
}

const fmtR = (r: number) => `${r > 0 ? '+' : ''}${Number(r.toFixed(1))}R`
const periodKey = (y: number, m: number) => y * 12 + (m - 1)

/** Tailwind border+bg per cell kind. Four clearly distinct hues so the day's
 *  outcome reads at a glance: green = net win, warn/red = net loss, gold = news
 *  alert, neutral grey = a quiet no-signal day. Empty days are near-invisible
 *  so the days that carry data pop out of the grid. */
function cellTone(s: DaySummary): string {
  switch (s.kind) {
    case 'empty':
      return 'border-transparent bg-ink/[0.03]'
    case 'news':
      return 'border-gold/50 bg-gold/10'
    case 'nosignal':
      return 'border-ink/15 bg-ink/[0.04]'
    case 'signals':
      return s.net !== null && s.net < 0
        ? 'border-warn/50 bg-warn/10'
        : 'border-signal/45 bg-signal/10'
  }
}

/** The headline — the one dominant element of a cell. R values are bold and
 *  coloured by sign; status days get a quiet word instead of a number. */
function CellHeadline({ s }: { s: DaySummary }) {
  if (s.kind === 'news') return <span className="font-semibold text-gold">No trade</span>
  if (s.kind === 'nosignal') return <span className="text-muted/90">No signal</span>
  if (s.kind === 'signals') {
    if (s.net === null) return <span className="font-semibold text-signal">{s.count} sig</span>
    return (
      <span className={cn('font-semibold', s.net < 0 ? 'text-warn' : 'text-signal')}>
        {fmtR(s.net)}
      </span>
    )
  }
  return null
}

/** One dot per signal — green hit target, warn-red stopped out. Dots can't
 *  wrap mid-word like text, so the breakdown stays tidy at any cell width;
 *  the written form lives in the cell's aria-label and the month tally. */
function SignalDots({ profit, loss }: { profit: number; loss: number }) {
  return (
    <span aria-hidden className="flex max-w-full flex-wrap items-center justify-center gap-[3px]">
      {Array.from({ length: profit }, (_, i) => (
        <span key={`p${i}`} className="h-1 w-1 rounded-full bg-signal sm:h-1.5 sm:w-1.5" />
      ))}
      {Array.from({ length: loss }, (_, i) => (
        <span key={`l${i}`} className="h-1 w-1 rounded-full bg-warn sm:h-1.5 sm:w-1.5" />
      ))}
    </span>
  )
}

/** LP-style monthly results calendar. One cell per day; days with a logged
 *  session are tinted by outcome (green win / warn loss / gold news / grey
 *  no-signal) and — when `onView` is given — the whole cell is the "view the
 *  decision" button. COMPLIANCE: values are R-multiples only, never $/% profit (PRD §8). */
export function SignalCalendar({
  sessions,
  caption,
  hint,
  emptyNote,
  onView,
}: {
  sessions: AiAgentSession[]
  /** sr-only table caption for screen readers. */
  caption: string
  /** Optional line under the grid telling visitors the cells are tappable. */
  hint?: string
  /** Shown when the visible month has no entries (e.g. a log not publishing yet). */
  emptyNote?: string
  onView?: (session: AiAgentSession) => void
}) {
  const byDate = useMemo(() => new Map(sessions.map((s) => [s.date, s])), [sessions])

  const { minP, maxP } = useMemo(() => {
    if (sessions.length === 0) {
      const n = new Date()
      const p = periodKey(n.getFullYear(), n.getMonth() + 1)
      return { minP: p, maxP: p }
    }
    const keys = sessions.map((s) => {
      const [y, m] = s.date.split('-').map(Number)
      return periodKey(y, m)
    })
    return { minP: Math.min(...keys), maxP: Math.max(...keys) }
  }, [sessions])

  const [period, setPeriod] = useState(maxP)
  const year = Math.floor(period / 12)
  const month = (period % 12) + 1

  const daysInMonth = new Date(year, month, 0).getDate()
  const firstWeekday = new Date(year, month - 1, 1).getDay() // 0 = Sunday
  const weeks: (number | null)[][] = []
  {
    let week: (number | null)[] = Array.from({ length: firstWeekday }, () => null)
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day)
      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    }
    if (week.length > 0) weeks.push([...week, ...Array(7 - week.length).fill(null)])
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const sessionFor = (day: number) => byDate.get(`${year}-${pad(month)}-${pad(day)}`)

  // Honest month tally: counts always; net R only when every result parses.
  const monthSessions = [...byDate.values()].filter((s) => {
    const [y, m] = s.date.split('-').map(Number)
    return y === year && m === month
  })
  let profit = 0
  let stop = 0
  let noSignalDays = 0
  let newsDays = 0
  let monthNet: number | null = 0
  for (const s of monthSessions) {
    if (s.signals.length === 0) {
      if (s.newsHold) newsDays++
      else noSignalDays++
      continue
    }
    for (const sig of s.signals) (sig.outcome === 'profit' ? profit++ : stop++)
    const r = netR(s)
    monthNet = monthNet === null || r === null ? null : monthNet + r
  }

  const navBtn =
    'grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-muted transition-colors hover:border-gold/60 hover:text-gold disabled:cursor-default disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-muted'

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          disabled={period <= minP}
          onClick={() => setPeriod((p) => Math.max(minP, p - 1))}
          className={navBtn}
        >
          <ArrowRight className="rotate-180" size={16} />
        </button>
        <p className="font-display text-xl text-ink">
          {MONTH_NAMES[month - 1]} {year}
        </p>
        <button
          type="button"
          aria-label="Next month"
          disabled={period >= maxP}
          onClick={() => setPeriod((p) => Math.min(maxP, p + 1))}
          className={navBtn}
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <table className="mt-4 w-full table-fixed border-separate border-spacing-1">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {WEEKDAYS.map((d) => (
              <th
                key={d}
                scope="col"
                className="pb-2 text-center font-mono text-[0.55rem] tracking-[0.15em] text-muted/80 uppercase sm:text-[0.65rem]"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (day === null) return <td key={di} className="p-0" />
                const session = sessionFor(day)
                const summary = summarize(session)

                const inner = (
                  <>
                    <span className="flex w-full items-start justify-between leading-none">
                      <span className="font-mono text-[0.55rem] text-muted/80 sm:text-[0.65rem]">
                        {day}
                      </span>
                      {summary.kind === 'news' && (
                        <span aria-hidden className="text-[0.55rem] sm:text-[0.7rem]">
                          🚨
                        </span>
                      )}
                    </span>
                    {summary.kind !== 'empty' && (
                      <span className="flex flex-1 flex-col items-center justify-center gap-1 text-center font-mono">
                        <span className="text-[0.6rem] leading-tight tracking-tight sm:text-sm">
                          <CellHeadline s={summary} />
                        </span>
                        {summary.kind === 'signals' && (
                          <SignalDots profit={summary.profit} loss={summary.loss} />
                        )}
                        {summary.kind === 'news' && (
                          <span className="hidden text-[0.55rem] tracking-[0.18em] text-gold/80 uppercase sm:block">
                            News
                          </span>
                        )}
                      </span>
                    )}
                  </>
                )

                const cellClass = cn(
                  'flex h-full min-h-[3.5rem] w-full flex-col rounded-lg border p-1.5 sm:min-h-[4.75rem] sm:p-2',
                  cellTone(summary),
                )

                return (
                  <td key={di} className="p-0 align-top">
                    {session && onView ? (
                      <button
                        type="button"
                        onClick={() => onView(session)}
                        aria-label={
                          summary.kind === 'news'
                            ? `High-impact news, no trade on ${day} ${MONTH_NAMES[month - 1]} ${year} — view details`
                            : summary.kind === 'signals'
                              ? `View the AI decision for ${day} ${MONTH_NAMES[month - 1]} ${year} — ${summary.count} signal${summary.count > 1 ? 's' : ''}: ${summary.profit} profit${summary.loss > 0 ? `, ${summary.loss} loss` : ''}`
                              : `View the AI decision for ${day} ${MONTH_NAMES[month - 1]} ${year}`
                        }
                        className={cn(
                          cellClass,
                          'cursor-pointer transition-colors hover:border-gold/60',
                        )}
                      >
                        {inner}
                      </button>
                    ) : (
                      <div className={cellClass}>{inner}</div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-ink/10 pt-4">
        {monthSessions.length === 0 ? (
          <p className="font-mono text-xs text-muted">{emptyNote ?? 'No entries this month.'}</p>
        ) : (
          <p className="font-mono text-xs text-muted">
            {monthNet !== null && (profit > 0 || stop > 0) && (
              <>
                Net{' '}
                <span className={monthNet < 0 ? 'text-warn' : 'text-signal'}>
                  {fmtR(monthNet)}
                </span>{' '}
                ·{' '}
              </>
            )}
            <span className="text-signal">{profit} profit</span> ·{' '}
            <span className="text-warn">{stop} loss</span>
            {noSignalDays > 0 && (
              <>
                {' '}
                · <span className="text-gold">{noSignalDays} no-signal</span>
              </>
            )}
            {newsDays > 0 && (
              <>
                {' '}
                · <span className="text-warn">{newsDays} news hold</span>
              </>
            )}
          </p>
        )}
        {monthSessions.length > 0 && (hint || profit + stop > 0) && (
          <div className="font-mono text-[0.6rem] leading-relaxed text-muted/80 sm:text-right">
            {hint && <p>{hint}</p>}
            {profit + stop > 0 && (
              <p>
                Each dot is one signal — <span className="text-signal">green hit target</span>,{' '}
                <span className="text-warn">red stopped out</span>.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import { backtest, type EA } from '../data'
import { cn } from '../lib/cn'
import { MyfxbookLink } from './MyfxbookLink'

type Tone = 'default' | 'gold' | 'warn' | 'signal'
interface Tile {
  label: string
  value: string
  tone: Tone
}

const toneClass: Record<Tone, string> = {
  default: 'text-ink',
  gold: 'text-gold',
  warn: 'text-warn',
  signal: 'text-signal',
}

/** Builds the ordered metric tiles for an EA, enforcing PRD §8/§10:
 *  EAs with a known Max DD lead with drawdown; the rest lead with return but
 *  always pair it with Profit Factor as the risk context. */
function buildStats(ea: EA): { tiles: Tile[]; caption?: string } {
  const m = ea.metrics
  const tiles: Tile[] = []

  if (ea.maxDrawdownKnown && m.maxDrawdown) {
    tiles.push({ label: 'Max drawdown', value: m.maxDrawdown, tone: 'warn' })
    if (m.trades) tiles.push({ label: 'Backtested trades', value: m.trades, tone: 'default' })
    if (m.return) tiles.push({ label: 'Net profit', value: m.return, tone: 'gold' })
    const caption =
      m.startingBalance && m.netProfit
        ? `Start ${m.startingBalance} → net profit ${m.netProfit}`
        : undefined
    return { tiles, caption }
  }

  if (m.return) tiles.push({ label: 'Total return', value: m.return, tone: 'gold' })
  if (m.profitFactor)
    tiles.push({ label: 'Profit Factor', value: m.profitFactor, tone: 'signal' })
  if (m.winRate) tiles.push({ label: 'Win rate', value: m.winRate, tone: 'default' })
  else if (m.trades) tiles.push({ label: 'Trades', value: m.trades, tone: 'default' })

  const captionParts = [m.growth, m.params].filter(Boolean)
  return { tiles, caption: captionParts.length ? captionParts.join(' · ') : undefined }
}

export function StatBlock({ ea, className }: { ea: EA; className?: string }) {
  const { tiles, caption } = buildStats(ea)

  return (
    <div className={cn('', className)}>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className="bg-surface/60 px-5 py-5">
            <div className="font-mono text-[0.65rem] tracking-[0.2em] text-muted/70 uppercase">
              {t.label}
            </div>
            <div className={cn('mt-1.5 font-mono text-2xl tabular-nums', toneClass[t.tone])}>
              {t.value}
            </div>
          </div>
        ))}
      </div>

      {caption && (
        <p className="mt-3 font-mono text-[0.7rem] tracking-wide text-muted">{caption}</p>
      )}

      <p className="mt-2 font-mono text-[0.7rem] tracking-wide text-muted">
        {backtest.periodLabel} · {backtest.methodLabel} · <MyfxbookLink>Live results</MyfxbookLink>
      </p>

      {ea.framingNote && (
        <p className="mt-3 max-w-prose border-l-2 border-warn/40 pl-3 text-xs leading-relaxed text-muted/90 italic">
          {ea.framingNote}
        </p>
      )}
    </div>
  )
}

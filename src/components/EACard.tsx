import { Link } from 'react-router-dom'
import { backtest, type EA } from '../data'
import { MyfxbookLink } from './MyfxbookLink'

/** Forex EA summary card — a uniform Return · Max DD · Profit Factor stat block across
 *  all EAs, so the three read consistently. Every return sits beside its risk context
 *  (max drawdown + profit factor) and the live Myfxbook link (PRD §10). */
export function EACard({ ea }: { ea: EA }) {
  const m = ea.metrics
  // Compliance: Omnicor's headline return must always carry its "aggressive parameters"
  // qualifier; trades give honest sample size for all three.
  const caption = [m.params, m.trades ? `${m.trades} trades` : null].filter(Boolean).join(' · ')

  const stats: { label: string; value: string; tone: string }[] = [
    { label: 'Return', value: m.return ?? '—', tone: 'text-gold' },
    { label: 'Max DD', value: m.maxDrawdown ?? '—', tone: 'text-warn' },
    { label: 'Profit Factor', value: m.profitFactor ?? '—', tone: 'text-ink' },
  ]

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-surface/40 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold/40">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
          {ea.pair} · {ea.timeframes.join(' & ')}
        </span>
        <span className="font-mono text-[0.7rem] text-muted/40 tabular-nums">0{ea.order}</span>
      </div>

      <h3 className="mt-4 font-display text-2xl leading-none text-ink">
        <Link to={`/forex/${ea.id}`} className="transition-colors hover:text-gold">
          {ea.name} EA
        </Link>
      </h3>

      {/* Fixed min-height so the divider + stats line up across cards regardless of
          how many lines the tagline wraps to. */}
      <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-muted">{ea.tagline}</p>

      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/10 pt-5">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="font-mono text-[0.55rem] tracking-[0.12em] text-muted/60 uppercase">
              {s.label}
            </dt>
            <dd className={`mt-1 font-mono text-lg tabular-nums ${s.tone}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      {caption && (
        <p className="mt-3 font-mono text-[0.6rem] tracking-wide text-muted/70">{caption}</p>
      )}

      <p className="mt-3 font-mono text-[0.65rem] tracking-wide text-muted/80">
        {backtest.period} · {backtest.method} · <MyfxbookLink>Live</MyfxbookLink>
      </p>

      <Link
        to={`/forex/${ea.id}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[0.7rem] tracking-[0.15em] text-gold uppercase transition-all group-hover:gap-2.5"
      >
        Explore <span aria-hidden>→</span>
      </Link>
    </article>
  )
}

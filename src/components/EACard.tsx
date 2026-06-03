import { Link } from 'react-router-dom'
import { backtest, type EA } from '../data'
import { cn } from '../lib/cn'
import { MyfxbookLink } from './MyfxbookLink'

function headline(ea: EA): {
  label: string
  value: string
  tone: string
  context: string
} {
  const m = ea.metrics
  if (ea.leadWithDrawdown && m.maxDrawdown) {
    return {
      label: 'Max drawdown',
      value: m.maxDrawdown,
      tone: 'text-warn',
      context: m.return ? `${m.return} net · ${m.trades} trades` : ea.riskContext,
    }
  }
  return {
    label: 'Total return',
    value: m.return ?? '—',
    tone: 'text-gold',
    context: ea.riskContext,
  }
}

export function EACard({ ea }: { ea: EA }) {
  const h = headline(ea)

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-surface/40 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold/40">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
          {ea.pair} · {ea.timeframes.join(' & ')}
        </span>
        <span className="font-mono text-[0.7rem] text-muted/40 tabular-nums">
          0{ea.order}
        </span>
      </div>

      <h3 className="mt-4 font-display text-2xl leading-none text-ink">
        <Link to={`/forex/${ea.id}`} className="transition-colors hover:text-gold">
          {ea.name}
        </Link>
      </h3>
      <p className="mt-1 font-display text-base text-gold italic">{ea.title}</p>

      <p className="mt-3 text-sm leading-relaxed text-muted">{ea.tagline}</p>

      <div className="mt-6 flex items-end gap-4">
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/60 uppercase">
            {h.label}
          </div>
          <div className={cn('font-mono text-3xl tabular-nums', h.tone)}>{h.value}</div>
        </div>
        <p className="pb-1 text-xs leading-snug text-muted">{h.context}</p>
      </div>

      <p className="mt-5 font-mono text-[0.65rem] tracking-wide text-muted/80">
        {backtest.period} · {backtest.method} · <MyfxbookLink>Live</MyfxbookLink>
      </p>

      <Link
        to={`/forex/${ea.id}`}
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.15em] text-gold uppercase transition-all group-hover:gap-2.5"
      >
        Explore <span aria-hidden>→</span>
      </Link>
    </article>
  )
}

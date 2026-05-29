import type { Bundle } from '../data'
import { cn } from '../lib/cn'
import { ClaimButton } from './ClaimButton'

function SpotsLeft({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.15em] text-gold uppercase">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
      {count} {count === 1 ? 'spot' : 'spots'} left
    </span>
  )
}

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const flagship = bundle.flagship

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-2xl border p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1',
        flagship
          ? 'border-gold/40 bg-surface/70 shadow-2xl shadow-black/30'
          : 'border-ink/10 bg-surface/40 hover:border-ink/25',
      )}
    >
      {flagship && (
        <span
          aria-hidden
          className="absolute -top-px right-7 left-7 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      )}

      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
          {bundle.subtitle}
        </span>
        <SpotsLeft count={bundle.spotsLeft} />
      </div>

      <h3 className="mt-4 font-display text-2xl text-ink">{bundle.name}</h3>

      <div className="mt-3 flex items-baseline gap-2">
        <span
          className={cn(
            'font-mono text-4xl tabular-nums',
            flagship ? 'text-gold' : 'text-ink',
          )}
        >
          {bundle.priceLabel}
        </span>
        <span className="font-mono text-[0.7rem] text-muted">one-time · lifetime</span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{bundle.audience}</p>

      <ul className="mt-5 space-y-2.5">
        {bundle.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm text-ink/90">
            <span aria-hidden className="mt-0.5 text-gold">
              ◆
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {bundle.ibNote && (
        <p className="mt-5 rounded-lg border border-ink/10 bg-void/40 p-3 text-xs leading-relaxed text-muted">
          {bundle.ibNote}
        </p>
      )}

      {flagship && bundle.valueLabel && (
        <p className="mt-5 font-mono text-[0.7rem] tracking-wide text-muted/70">
          Value {bundle.valueLabel} · save {bundle.saveLabel}
        </p>
      )}

      <div className="mt-auto pt-7">
        <ClaimButton
          item={bundle.name}
          variant={flagship ? 'primary' : 'ghost'}
          className="w-full"
        >
          Claim — {bundle.priceLabel}
        </ClaimButton>
      </div>
    </article>
  )
}

import { subscription } from '../data'
import { ClaimButton } from './ClaimButton'

/** All-access signal subscription price block. Same on both signal pages. */
export function SignalPricing({ className }: { className?: string }) {
  const s = subscription
  return (
    <div className={className}>
      <div className="rounded-2xl border border-gold/25 bg-surface/40 p-6 sm:p-8">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
          Private signal subscription
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink/10 bg-void/40 p-5">
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/80 uppercase">Monthly</p>
            <p className="mt-1 font-display text-3xl font-light text-ink">
              {s.monthly}
              <span className="text-base text-muted"> / mo</span>
            </p>
          </div>
          <div className="rounded-xl border border-gold/30 bg-void/40 p-5">
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-gold uppercase">Yearly</p>
            <p className="mt-1 font-display text-3xl font-light text-ink">
              {s.yearly}
              <span className="text-base text-muted"> / yr</span>
            </p>
            <p className="mt-1 font-mono text-[0.65rem] text-signal">{s.yearlyNote}</p>
          </div>
        </div>
        <p className="mt-5 border-l-2 border-gold/40 pl-3 text-sm leading-relaxed text-muted">
          {s.allAccessNote}
        </p>
        <p className="mt-3 font-mono text-[0.7rem] text-muted/80">
          Delivered in a {s.channel} · payment {s.payment}.
        </p>
        <div className="mt-6">
          <ClaimButton item="the all-access signal subscription ($10/mo · $99/yr)">
            Subscribe
          </ClaimButton>
        </div>
      </div>
    </div>
  )
}

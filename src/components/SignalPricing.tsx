import { subscription, forexTiers } from '../data'
import { ClaimButton } from './ClaimButton'
import { cn } from '../lib/cn'

/** All-access signal subscription price block + Exclusive Membership option. Same on both
 *  signal pages. */
export function SignalPricing({ className }: { className?: string }) {
  const s = subscription
  const membershipTier = forexTiers.find((t) => t.id === 'exclusive-membership')

  return (
    <div className={cn("grid gap-6 xl:grid-cols-2", className)}>
      {/* 1. Subscription Card */}
      <div className="flex flex-col rounded-2xl border border-gold/25 bg-surface/40 p-6 sm:p-8">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
          Private signal subscription
        </p>
        <div className="mt-5 rounded-xl border border-gold/30 bg-void/40 p-5">
          <p className="font-mono text-[0.6rem] tracking-[0.2em] text-gold uppercase">Monthly</p>
          <p className="mt-1 font-display text-3xl font-light text-ink">
            {s.monthly}
            <span className="text-base text-muted"> / mo</span>
          </p>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
            {s.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span aria-hidden className="text-gold">
                  ·
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5 border-l-2 border-gold/40 pl-3 text-sm leading-relaxed text-muted">
          {s.allAccessNote}
        </p>
        <p className="mt-3 font-mono text-[0.7rem] text-muted/80">
          Delivered in a {s.channel} · payment {s.payment}.
        </p>
        <div className="mt-auto pt-6">
          <ClaimButton
            item={`the all-access signal subscription (${s.monthly}/mo)`}
            className="w-full"
          >
            Subscribe
          </ClaimButton>
        </div>
      </div>

      {/* 2. Exclusive Membership Card */}
      {membershipTier && (
        <div className="relative flex flex-col rounded-2xl border border-ink/10 bg-surface/40 p-6 sm:p-8 overflow-hidden">
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
            {membershipTier.name}
          </p>
          <p className="mt-4 font-display text-4xl font-light text-ink">
            {membershipTier.price}
            <span className="ml-2 font-mono text-[0.65rem] tracking-[0.15em] text-muted/80 uppercase">
              one-time
            </span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{membershipTier.tagline}</p>
          <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-muted">
            {membershipTier.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span aria-hidden className="text-gold">
                  ·
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6">
            <ClaimButton
              item={`${membershipTier.name} (${membershipTier.price})`}
              variant="ghost"
              className="w-full"
            >
              Claim {membershipTier.name}
            </ClaimButton>
          </div>
        </div>
      )}
    </div>
  )
}

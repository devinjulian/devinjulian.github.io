import { Link } from 'react-router-dom'
import { polybot } from '../data'
import type { PolyBotTier } from '../data'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { PolyBotNote } from '../components/PolyBotNote'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { ClaimButton } from '../components/ClaimButton'
import { Reveal } from '../components/Reveal'

function TierRow({ t, accent }: { t: PolyBotTier; accent: 'ink' | 'gold' }) {
  return (
    <li className="flex items-baseline justify-between gap-4">
      <span className="text-ink">
        {t.tier} <span className="text-sm text-muted">· {t.detail}</span>
      </span>
      <span className={`font-mono tabular-nums ${accent === 'gold' ? 'text-gold' : 'text-ink'}`}>
        {t.price}
      </span>
    </li>
  )
}

export function PolyBot() {
  return (
    <>
      <PageHero
        kicker="PolyBot"
        title={
          <>
            The next chapter — <em className="text-gold">not yet open.</em>
          </>
        }
        subtitle="PolyBot moves the lab on-chain. Pricing is published for transparency, but nothing ships until launch — and Founding Members receive the full Python source the moment it does."
      />

      <Container size="narrow">
        <Reveal>
          <p className="inline-flex rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.7rem] tracking-[0.15em] text-signal uppercase">
            {polybot.status}
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <PolyBotNote className="max-w-xl" />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-ink/10 bg-surface/40 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
                Standalone · available after launch
              </p>
              <ul className="mt-4 space-y-3">
                {polybot.standalone.map((t) => (
                  <TierRow key={t.tier} t={t} accent="ink" />
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-xl border border-gold/25 bg-surface/40 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                {polybot.earlyBird.note}
              </p>
              <ul className="mt-4 space-y-3">
                {polybot.earlyBird.tiers.map((t) => (
                  <TierRow key={t.tier} t={t} accent="gold" />
                ))}
              </ul>
              <div className="mt-5">
                <ClaimButton item="the PolyBot early-bird waitlist" variant="ghost" size="sm">
                  Join the waitlist
                </ClaimButton>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="max-w-xl leading-relaxed text-muted">
            Founding Members receive the full PolyBot Python source after launch, at the price they
            came in at.{' '}
            <Link to="/pricing" className="text-gold transition-colors hover:text-gold-deep">
              See the bundles →
            </Link>
          </p>
        </Reveal>

        <section className="mt-12 border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

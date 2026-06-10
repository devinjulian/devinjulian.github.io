import { bundles, scarcityNote } from '../data'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { BundleCard } from '../components/BundleCard'
import { Button } from '../components/Button'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

/** The Founding Members page (route /founding-members) — one early-phase offer. */
export function Pricing() {
  const founding = bundles[0]
  return (
    <>
      <section className="pt-20 pb-8 sm:pt-28">
        <Container>
          <Reveal mode="mount">
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">Founding Members</p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.04] font-light text-ink sm:text-7xl">
              Back the lab. <em className="text-gold">Own the engine.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              One early-phase offer — one-time and lifetime. You're not buying a rental; you're
              funding the build and keeping permanent ownership of everything the lab ships. You buy
              by talking to a human, not a checkout.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container>
        {/* 01 — The offer */}
        <section className="py-12">
          <Reveal>
            <SectionLabel index="01">The offer</SectionLabel>
          </Reveal>
          <div className="mt-10 max-w-md">
            <Reveal>
              <BundleCard bundle={founding} />
            </Reveal>
          </div>
          <Reveal className="mt-6">
            <p className="border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted">
              {scarcityNote}
            </p>
          </Reveal>
        </section>

        {/* 02 — Why $3,999 */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel index="02">Why $3,999</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              This isn't a discount — it's the earliest-backer price. Running an AI trading research
              desk is not cheap: at 2026 rates the AI reasoning, market and on-chain data feeds, 24/7
              compute and signal infrastructure run from a few hundred to a few thousand dollars a
              month — before the years already spent building. A Founding Member funds that stack at
              the start and locks permanent ownership before the price grows into the cost of the
              build.
            </p>
          </Reveal>
        </section>

        {/* 03 — Where this is going */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel index="03">Where this is going</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              The lab is moving from signals you place yourself toward supervised automation — the
              same brain, wired to execute on your terms. Founding Members come along for every step
              at the price they came in at. No forward promises on returns; only that you're first in
              line for what ships.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="ghost" to="/forex">
                Individual EA pricing
              </Button>
              <Button variant="ghost" to="/crypto-futures-signals">
                See the signals
              </Button>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-ink/10 py-12">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

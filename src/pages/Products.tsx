import { eas, links, forexTiers, brokers } from '../data'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { PageHero } from '../components/PageHero'
import { EACard } from '../components/EACard'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

/** Products overview — the three EAs at a glance, each linking to its own detail page. */
export function Products() {
  return (
    <>
      <PageHero
        kicker="Forex Bots"
        title={
          <>
            Three specialists. <em className="text-gold">One smoother curve.</em>
          </>
        }
        subtitle="Our Forex algorithms — each a specialist in the anatomy of its pair. Open any one to see its mechanism, full stats, and verified MT5 backtests."
        size="default"
      />

      <Container>
        <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {eas.map((ea, i) => (
            <Reveal key={ea.id} delay={i * 0.1} className="h-full">
              <EACard ea={ea} />
            </Reveal>
          ))}
        </div>

        <Section label="Why Three" className="border-t border-ink/10 py-16 sm:py-24">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              Correlation is the quiet killer of single-system accounts.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-muted">
              EURUSD, GBPUSD and gold don't bleed at the same time. So when one algorithm
              is underwater, another is usually working. Run the trinity together and the
              combined equity curve smooths into something you can actually live with —
              which is the entire point of owning all three.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ClaimButton>Own all three</ClaimButton>
              <Button variant="ghost" href={links.myfxbook} external>
                See the track record
              </Button>
            </div>
          </Reveal>
        </Section>

        {/* Pricing — one bundle, three ways to own it (v1.7, 2026-06-11) */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              One bundle, all three EAs. <em className="text-gold">Choose how you own it.</em>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Every tier includes Omnicor, Cenith and Golden together — the EAs are not sold
              separately. The only decision is the license that fits you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {forexTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="relative flex h-full flex-col rounded-2xl border border-ink/10 bg-surface/40 p-7 overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                      {tier.name}
                    </p>
                    {tier.id === 'source-code' && (
                      <span className="shrink-0 inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[0.6rem] tracking-[0.1em] text-gold uppercase">
                        Funding Member
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-display text-4xl font-light text-ink">
                    {tier.price}
                    <span className="ml-2 font-mono text-[0.65rem] tracking-[0.15em] text-muted/80 uppercase">
                      one-time
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{tier.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm leading-relaxed text-muted">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <span aria-hidden className="text-gold">
                          ·
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier.ibNote && (
                    <p className="mt-5 text-xs leading-relaxed text-muted/80">
                      {tier.ibNote} — listed below.
                    </p>
                  )}
                  <div className="mt-6">
                    <ClaimButton
                      item={`${tier.name} bundle (${tier.price})`}
                      variant={tier.requiresIB ? 'primary' : 'ghost'}
                      className="w-full"
                    >
                      Claim {tier.name}
                    </ClaimButton>
                  </div>
                </div>
              ))}
            </div>

            {/* IB brokers — stated plainly, not hidden */}
            <div className="mt-8 rounded-xl border border-ink/10 bg-surface/30 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/80 uppercase">
                The Partner (IB) price requires one of these brokers
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {brokers.map((br) => (
                  <a
                    key={br.name}
                    href={br.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    {br.name}
                    {br.note && (
                      <span className="font-mono text-[0.65rem] text-muted">{br.note}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-6 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted">
              A license covers three trading account numbers of your choosing, for life — pay
              once, no renewals. The source-code tier has no account lock: you receive the
              .mq5 files themselves.
            </p>
          </Reveal>
        </section>

        <section className="border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

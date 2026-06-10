import { eas, links, individualEAs, brokers, scarcityNote } from '../data'
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
              <Button variant="primary" to="/founding-members">
                Become a Founding Member
              </Button>
              <Button variant="ghost" href={links.myfxbook} external>
                See the track record
              </Button>
              <ClaimButton variant="ghost" />
            </div>
          </Reveal>
        </Section>

        {/* EA pricing — moved here from the old Pricing page (v1.6, 2026-06-10) */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>EA pricing</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Rather start with one? Each algorithm stands on its own.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Mobile: stacked cards — no horizontal scroll, no hidden columns */}
            <div className="mt-9 grid gap-4 md:hidden">
              {individualEAs.map((row) => (
                <div key={row.ea} className="rounded-xl border border-ink/10 bg-surface/40 p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-xl text-ink">{row.ea}</span>
                    <span className="font-mono text-sm text-muted">{row.pair}</span>
                  </div>
                  <dl className="mt-4 grid grid-cols-3 gap-3 font-mono text-sm">
                    <div>
                      <dt className="text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">Partner</dt>
                      <dd className="mt-1 text-ink">{row.partnerIB}</dd>
                      <dd className="text-[0.6rem] text-muted/70">{row.partnerLicenses}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">Any broker</dt>
                      <dd className="mt-1 text-ink">{row.anyBroker}</dd>
                      <dd className="text-[0.6rem] text-muted/70">{row.anyBrokerLicenses}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">Source</dt>
                      <dd className="mt-1 text-gold">{row.sourceCode}</dd>
                      <dd className="text-[0.6rem] text-muted/70">.mq5 · instant</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="mt-9 hidden md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/15 font-mono text-[0.65rem] tracking-[0.2em] text-muted/70 uppercase">
                    <th className="py-3 pr-4 font-normal">EA</th>
                    <th className="py-3 pr-4 font-normal">Pair</th>
                    <th className="py-3 pr-4 font-normal">Partner (IB)</th>
                    <th className="py-3 pr-4 font-normal">Any broker</th>
                    <th className="py-3 font-normal">Source code</th>
                  </tr>
                </thead>
                <tbody>
                  {individualEAs.map((row) => (
                    <tr key={row.ea} className="border-b border-ink/5">
                      <td className="py-4 pr-4 font-display text-lg text-ink">{row.ea}</td>
                      <td className="py-4 pr-4 font-mono text-sm text-muted">{row.pair}</td>
                      <td className="py-4 pr-4">
                        <span className="font-mono text-sm text-ink">{row.partnerIB}</span>
                        <span className="block font-mono text-[0.65rem] text-muted/70">
                          {row.partnerLicenses}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="font-mono text-sm text-ink">{row.anyBroker}</span>
                        <span className="block font-mono text-[0.65rem] text-muted/70">
                          {row.anyBrokerLicenses}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-mono text-sm text-gold">{row.sourceCode}</span>
                        <span className="block font-mono text-[0.65rem] text-muted/70">
                          .mq5 · instant
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* IB brokers — stated plainly, not hidden */}
            <div className="mt-8 rounded-xl border border-ink/10 bg-surface/30 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
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
              {scarcityNote}
            </p>

            <div className="mt-8">
              <ClaimButton item="an individual EA" variant="ghost">
                Claim an individual EA
              </ClaimButton>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

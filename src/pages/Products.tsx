import { eas, links } from '../data'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
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

        <section className="border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

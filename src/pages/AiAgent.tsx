import { eaPlans, billing } from '../data'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { SectionLabel } from '../components/SectionLabel'
import { DecisionFlow } from '../components/DecisionFlow'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

/** How the two systems divide the work. Deliberately short — the diagram carries the
 *  explanation, the copy only labels it. */
const SPECIALISTS = [
  {
    k: 'The EA',
    v: 'Technical. It knows one pair intimately — structure, levels, the shape of its setup — and it never gets tired, distracted or impatient.',
    blind: 'Blind to: anything that is not on the chart.',
  },
  {
    k: 'The AI Trading Agent',
    v: 'Fundamental. It reads the economic calendar, the releases and the market context from outside the chart entirely.',
    blind: 'Its job: stop a technically perfect trade taken at the wrong moment.',
  },
]

export function AiAgent() {
  const entry = eaPlans[0]

  return (
    <>
      <PageHero
        kicker="The AI Trading Agent"
        title={
          <>
            A chart can't read the news. <em className="text-gold">So something else does.</em>
          </>
        }
        subtitle="Most robots only see price. Ours asks a second opinion before it commits — one that reads the calendar, the releases and the context no candle can show."
        size="default"
      />

      <Container>
        <Reveal>
          <DecisionFlow />
        </Reveal>

        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>Two specialists</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Neither one is enough alone. <em className="text-gold">Together they are.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              {SPECIALISTS.map((s) => (
                <div key={s.k} className="glass flex flex-col rounded-3xl p-7">
                  <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                    {s.k}
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-ink">{s.v}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{s.blind}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>Why it matters</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              The worst losses aren't bad setups.{' '}
              <em className="text-gold">They're good setups at bad moments.</em>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Every rule-based robot has the same weakness: it will take a textbook entry
              ninety seconds before a rate decision, because the chart never told it not to.
              That is the gap this closes.
            </p>
          </Reveal>
        </section>

        <Reveal>
          <div className="glass glass-gold rounded-3xl px-7 py-12 text-center">
            <h2 className="font-display text-3xl leading-tight font-light text-balance text-ink sm:text-4xl">
              Three machines. <em className="text-gold">One second opinion.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
              From {entry.price} a {billing.period}. Stop any month you like.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ClaimButton item={`${entry.name} — ${entry.price}/${billing.period}`}>
                Start now
              </ClaimButton>
              <Button variant="ghost" to="/forex">
                See the machines
              </Button>
              <Button variant="ghost" to="/faq">
                Read the FAQ
              </Button>
            </div>
          </div>
        </Reveal>

        <section className="mt-12 border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

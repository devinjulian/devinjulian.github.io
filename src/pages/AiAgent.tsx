import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { PageHero } from '../components/PageHero'
import { AIAgentNote } from '../components/AIAgentNote'
import { Button } from '../components/Button'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

export function AiAgent() {
  return (
    <>
      <PageHero
        kicker="The Frontier"
        title={
          <>
            The AI Trading Agent. <em className="text-gold">In active research.</em>
          </>
        }
        subtitle="The lab's next frontier — an AI research desk that reads the context rule-based bots are blind to. It is decision-support, not a product you can buy today."
        size="default"
      />

      <Container size="narrow">
        <Reveal>
          <p className="inline-flex rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.7rem] tracking-[0.15em] text-signal uppercase">
            In active research &amp; design
          </p>
        </Reveal>

        <Section label="What it is" className="py-14 sm:py-20">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              An AI research desk that studies the market each session the way a hedge-fund team
              would — a panel of specialist analysts (technical, quantitative, macro, market
              strategy, and risk) whose findings are weighed into a single high-conviction view:
              buy, sell, or stand aside. It does the morning analysis a serious desk does, every
              session, before the market opens.
            </p>
          </Reveal>
        </Section>

        <Section
          label="Why it's different"
          side="right"
          className="border-t border-ink/10 py-14 sm:py-20"
        >
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              It reasons over real, computed market data — not vibes. A hard risk gate sits{' '}
              <em className="text-ink">after</em> the AI, so a wrong call still can't blow the
              account. And a human reviews every signal before anything is ever automated. It is
              decision-support, not a "money machine."
            </p>
          </Reveal>
        </Section>

        <Section label="Where it sits" className="border-t border-ink/10 py-14 sm:py-20">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              The evolution beyond the Forex trinity and PolyBot — the same lab, the same
              transparency standard (drawdown shown, results verified), pointed at a harder
              problem. Founding Members will be first in line when it ships; terms are confirmed
              closer to launch.
            </p>
            <div className="mt-8">
              <Button variant="ghost" to="/pricing">
                Become a Founding Member
              </Button>
            </div>
            <AIAgentNote className="mt-8 max-w-xl" />
          </Reveal>
        </Section>

        <section className="border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

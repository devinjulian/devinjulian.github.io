import { useState } from 'react'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { PageHero } from '../components/PageHero'
import { AIAgentNote } from '../components/AIAgentNote'
import { AiAgentResults } from '../components/AiAgentResults'
import { AiAgentAbout } from '../components/AiAgentAbout'
import { Button } from '../components/Button'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'
import { links } from '../data'

export function AiAgent() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <PageHero
        kicker="The Frontier"
        title={
          <>
            The AI Trading Agent. <em className="text-gold">Live, in manual testing.</em>
          </>
        }
        subtitle="An AI research desk that reads the context rule-based bots are blind to — now issuing crypto Buy/Sell decisions, every one reviewed by a human. It is decision-support in a testing phase, not a product you can buy yet."
        size="default"
      />

      <Container size="default">
        <Reveal>
          <p className="inline-flex rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.7rem] tracking-[0.15em] text-signal uppercase">
            Live · manual testing
          </p>
        </Reveal>

        {/* The testing log is the focus of this page — first under the hero. */}
        <Section label="The testing log" className="mt-8">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              Forward-testing in the open — every session is logged below, taken or skipped, with the
              reasoning behind it. Some days the most honest call is to do nothing. Results are shown
              as R-multiples (reward versus the risk taken), never as profit promises.
            </p>
          </Reveal>
          <Reveal className="mt-5">
            <p className="max-w-2xl border-l-2 border-gold/40 pl-3 text-sm leading-relaxed text-muted/90 italic">
              How this log works: each decision is recorded at the session it's made — before the
              outcome is known — with the full reasoning behind it.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <AiAgentResults />
          </Reveal>
          <AIAgentNote className="mt-8 max-w-xl" />
        </Section>

        {/* Deeper context + conversion live at the bottom, out of the table's way. */}
        <Section
          label="Going deeper"
          side="right"
          className="mt-14 border-t border-ink/10 pt-14 sm:mt-20 sm:pt-20"
        >
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              See how the Agent reaches a decision, follow the testing as it runs, and take your place
              in line for launch — Founding Members are first when it ships.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button variant="primary" href={links.telegram} external>
                Follow on Telegram
              </Button>
              <Button variant="ghost" onClick={() => setAboutOpen(true)}>
                How it works
              </Button>
              <Button variant="ghost" to="/pricing">
                Become a Founding Member
              </Button>
            </div>
          </Reveal>
        </Section>

        <section className="mt-14 border-t border-ink/10 py-10 sm:mt-20">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>

      {aboutOpen && <AiAgentAbout onClose={() => setAboutOpen(false)} />}
    </>
  )
}

import { useState } from 'react'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { AiAgentResults } from '../components/AiAgentResults'
import { AiAgentAbout } from '../components/AiAgentAbout'
import { Button } from '../components/Button'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'
import { links, AI_AGENT_DISCLAIMER } from '../data'

/** The proof page — the AI Trading Agent's public session record, free and open.
 *  Nothing is sold here; it exists so a visitor can audit the work before paying
 *  for anything. */
export function Proof() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <PageHero
        kicker="The Record"
        title={
          <>
            Anyone can show you the wins. <em className="text-gold">Here are the losses too.</em>
          </>
        }
        subtitle="Every session the AI Trading Agent runs is logged in public, the day it happens — taken or skipped, right or wrong. No screenshots, no cherry-picking, no edits after the fact. Read it before you pay us anything."
        size="default"
      />

      <Container size="default">
        <Reveal>
          <p className="inline-flex rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.7rem] tracking-[0.15em] text-signal uppercase">
            Live · logging every session
          </p>
        </Reveal>

        <section className="mt-8">
          <Reveal>
            <p className="max-w-2xl border-l-2 border-gold/40 pl-3 text-sm leading-relaxed text-muted/90 italic">
              How this log works: each decision is recorded at the session it's made — before the
              outcome is known — with the full reasoning behind it.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <AiAgentResults />
          </Reveal>
        </section>

        <section className="mt-14 border-t border-ink/10 pt-14 sm:mt-20 sm:pt-20">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              This is the same research desk. <em className="text-gold">The machines just don't sleep.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              The Agent reads the calendar, the releases and the context a rule-based system
              is blind to — then says what it sees, in the open, every session. Watch it for a
              week before you decide anything.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button to="/forex">See the machines</Button>
              <Button variant="ghost" href={links.telegram} external>
                Follow on Telegram
              </Button>
              <Button variant="ghost" onClick={() => setAboutOpen(true)}>
                How the Agent decides
              </Button>
            </div>
          </Reveal>
        </section>

        {/* Fine print at the foot, out of the way — required wherever the Agent appears. */}
        <section className="mt-14 space-y-4 border-t border-ink/10 py-10 sm:mt-20">
          <p className="max-w-3xl text-xs leading-relaxed text-muted">
            <span className="font-mono tracking-[0.2em] text-muted uppercase">
              AI Trading Agent —{' '}
            </span>
            {AI_AGENT_DISCLAIMER}
          </p>
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>

      {aboutOpen && <AiAgentAbout onClose={() => setAboutOpen(false)} />}
    </>
  )
}

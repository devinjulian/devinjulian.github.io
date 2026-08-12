import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { Button } from '../components/Button'
import { EquityCurve } from '../components/EquityCurve'
import { HeroCanvas } from '../components/HeroCanvas'
import { Reviews } from '../components/Reviews'
import { Reveal } from '../components/Reveal'
import { RegimeReadoutCompact } from '../components/RegimeReadout'
import { eaPlans, billing, membershipLadder } from '../data'

export function Home() {
  // Prices and the slot count come from data so the homepage can never drift from the
  // pricing pages (PRD §14.1 — the count must always be true).
  const entryPlan = eaPlans[0]
  const openSlot = membershipLadder.stages.find((s) => s.state === 'open')

  return (
    <>
      {/* Hero — full-bleed cinematic equity canvas behind the copy. Mobile keeps the copy
          bottom-anchored; from sm up it sits just under the header instead of being pushed
          to the fold. */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden pb-16 sm:items-start sm:pt-20 sm:pb-24">
        <HeroCanvas />
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <Reveal mode="mount">
              <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
                The Time Capitalist
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] font-light text-ink sm:text-7xl lg:text-8xl">
                Money is infinite.
                <br />
                <em className="text-gold">Your time is not.</em>
              </h1>
            </Reveal>
            <Reveal mode="mount" delay={0.15} className="mt-8 max-w-xl">
              <p className="text-lg leading-relaxed text-muted">
                Algorithms that trade while you sleep — and give back the one account that
                never refills: <em className="text-ink">your life</em>.
              </p>
            </Reveal>
            <Reveal mode="mount" delay={0.3} className="mt-10">
              <div className="flex flex-wrap items-center gap-4">
                <Button to="/forex">See the machines</Button>
                <Button variant="ghost" to="/how-it-works">
                  How it works
                </Button>
              </div>
            </Reveal>
            {/* The only proof signal on this page, so it carries more weight than fine print. */}
            <Reveal mode="mount" delay={0.42} className="mt-8">
              <p className="font-mono text-xs tracking-wide text-muted">
                Verified on Myfxbook · every return shown with its drawdown · all three machines
                from $32 a month
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 01 — The Reality Check */}
      <Container>
        <Section index="01" label="The Reality Check" className="py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              The promise was freedom. What it handed you was a <em className="text-gold">leash</em>.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                You stacked indicators and back-read charts past midnight. You checked the
                broker app at 3 a.m. like it owed you something — and the market still
                didn't pay for a minute of it.
              </p>
              <p>
                There is no <em className="text-ink">holy grail</em>. There is a system that
                runs without you, or a screen that quietly owns the rest of your life. The
                first one is a decision. The second one is a default.
              </p>
            </div>
          </Reveal>
        </Section>
      </Container>

      {/* 02 — The Agent. The strongest differentiator on the site, and until now it lived
          only behind a nav link. The teaser carries the same axes and the same number as
          the full panel on /ai-agent. */}
      <Container>
        <Section index="02" label="The Agent" side="right" className="py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              Most robots only see price.{' '}
              <em className="text-gold">Ours sees the regime.</em>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              What kills a grid isn't a news spike — it's a market that keeps going while the
              grid keeps averaging into it. So a second system watches the conditions, and
              scales the exposure before the depth becomes the problem.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-9 max-w-xl">
            <RegimeReadoutCompact />
          </Reveal>
          <Reveal delay={0.15} className="mt-7">
            <Button variant="ghost" to="/ai-agent">
              How it decides
            </Button>
          </Reveal>
        </Section>
      </Container>

      {/* 03 — Reclaim Your Time (full-bleed band) */}
      <section className="relative overflow-hidden border-y border-ink/10 py-28 sm:py-40">
        <div className="hero-curve">
          <div className="absolute inset-0 opacity-30">
            <EquityCurve uid="reclaim" animate={false} />
          </div>
        </div>
        <Container size="narrow" className="relative z-10">
          <Reveal className="text-center">
            <SectionLabel index="03" className="justify-center">
              Reclaim Your Time
            </SectionLabel>
            <h2 className="mt-7 font-display text-4xl leading-tight font-light text-balance text-ink sm:text-6xl">
              Every month you wait is a month you spend watching.{' '}
              <em className="text-gold">You don't get it back.</em>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">
              The wealthiest people you know stopped trading hours for money. Automation is how
              you cross that line — while you're somewhere else entirely.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* In their words — real member reviews (swipeable slider) */}
      <Reviews />

      {/* CTA */}
      <section className="pt-12 pb-8">
        <Container>
          <Reveal>
            <div className="glass glass-gold relative rounded-3xl px-8 py-16 text-center sm:px-16">
              <span
                aria-hidden
                className="absolute -top-px right-16 left-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
                Own the machine. <em className="text-gold">Keep your hours.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">
                All three machines from {entryPlan.price} a {billing.period}, and every new
                release the lab ships. Stop whenever you like — there is no contract.
              </p>
              {openSlot && (
                <p className="mt-5 font-mono text-[0.7rem] tracking-[0.15em] text-gold uppercase">
                  Exclusive Membership — {openSlot.slotsLeft} of {openSlot.slots} slots left at{' '}
                  {openSlot.price}
                </p>
              )}
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button to="/forex">See pricing</Button>
                <Button variant="ghost" to="/how-it-works">
                  How it works
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

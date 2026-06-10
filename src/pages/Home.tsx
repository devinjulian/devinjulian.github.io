import { backtest, links } from '../data'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { ClaimButton } from '../components/ClaimButton'
import { Button } from '../components/Button'
import { EquityCurve } from '../components/EquityCurve'
import { HeroCanvas } from '../components/HeroCanvas'
import { AIAgentNote } from '../components/AIAgentNote'
import { Reviews } from '../components/Reviews'
import { Reveal } from '../components/Reveal'

export function Home() {
  return (
    <>
      {/* Hero — full-bleed cinematic equity canvas behind lower-left copy. */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden pb-16 sm:pb-24">
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
                We build algorithms that compound wealth while you sleep — so the hours
                you'd spend staring at charts go back to the one account that never
                refills: <em className="text-ink">your life</em>.
              </p>
            </Reveal>
            <Reveal mode="mount" delay={0.3} className="mt-10">
              <div className="flex flex-wrap items-center gap-4">
                <ClaimButton />
                <Button variant="ghost" href={links.myfxbook} external>
                  See the live results
                </Button>
              </div>
            </Reveal>
            <Reveal mode="mount" delay={0.42} className="mt-8">
              <p className="font-mono text-[0.7rem] tracking-wide text-muted/80">
                Verified on Myfxbook · {backtest.periodLabel} · {backtest.methodLabel}
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

      {/* 02 — The Lab */}
      <Container>
        <Section index="02" label="The Lab" side="right" className="py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              This isn't a product you shelve. <em className="text-gold">It's a lab.</em>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              Algo Trading Center is a working research lab, not a finished catalogue. New pairs
              sit in testing, and the newest frontier — the{' '}
              <strong className="font-semibold text-ink">AI Trading Agent</strong> — is already
              live in manual testing, now issuing{' '}
              <strong className="font-semibold text-ink">Crypto Futures and Polymarket signals</strong>:
              a research desk that studies the market each session the way a hedge-fund team would,
              with every signal human-reviewed. Back the lab early and you stop being a customer:
              you receive what ships at the price you came in at, and you're first in line for
              what's still being built.
            </p>
            <div className="mt-7 max-w-xl">
              <AIAgentNote />
            </div>
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
              You can always make more money. <em className="text-gold">You cannot make more time.</em>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">
              The wealthiest people you know aren't the ones with the most money. They're
              the ones who stopped trading their hours for it. Automation is how you cross
              that line — on the next candle, while you're somewhere else entirely.
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
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-surface/50 px-8 py-16 text-center sm:px-16">
              <span
                aria-hidden
                className="absolute -top-px right-16 left-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
                Claim your seat at the <em className="text-gold">original price.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted">
                Founding seats are limited, and the counters are real. When it fills,
                its pricing closes for good.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <ClaimButton />
                <Button variant="ghost" to="/pricing">
                  See pricing
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

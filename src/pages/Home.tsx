import { eas, backtest, links } from '../data'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { EACard } from '../components/EACard'
import { ClaimButton } from '../components/ClaimButton'
import { Button } from '../components/Button'
import { EquityCurve } from '../components/EquityCurve'
import { CountUp } from '../components/CountUp'
import { HeroCanvas } from '../components/HeroCanvas'
import { PolyBotNote } from '../components/PolyBotNote'
import { AIAgentNote } from '../components/AIAgentNote'
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

      {/* 02 — The Algorithmic Trinity */}
      <Container>
        <Section index="02" label="The Algorithmic Trinity" side="right" className="py-24 sm:py-32">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              Three specialists, because each market has a different <em className="text-gold">anatomy</em>.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              One bot can't be fluent in everything. So each algorithm masters a single
              market — and run together, their drawdowns rarely line up. The portfolio
              breathes where a single system would break.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {eas.map((ea, i) => (
              <Reveal key={ea.id} delay={i * 0.1} className="h-full">
                <EACard ea={ea} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Button variant="ghost" to="/products">
              See all three in depth
            </Button>
          </Reveal>
        </Section>
      </Container>

      {/* 03 — The Proof */}
      <Container>
        <Section index="03" label="The Proof" className="py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              Don't believe us. <em className="text-gold">Verify us.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Anyone can post a screenshot. We publish a live, third-party track record
              you can open right now — alongside the full backtest method behind every
              number on this site.
            </p>

            <div className="mt-8 max-w-2xl overflow-hidden rounded-2xl border border-ink/10 bg-surface/40">
              <div className="h-28 sm:h-36">
                <EquityCurve uid="proof" />
              </div>
              <div className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3">
                <div className="bg-surface/60 px-5 py-4">
                  <div className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">
                    Profit factor
                  </div>
                  <div className="mt-1 font-mono text-2xl text-gold tabular-nums">
                    <CountUp value="3.65" />
                  </div>
                </div>
                <div className="bg-surface/60 px-5 py-4">
                  <div className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">
                    Max drawdown
                  </div>
                  <div className="mt-1 font-mono text-2xl text-warn tabular-nums">
                    <CountUp value="53.70%" />
                  </div>
                </div>
                <div className="col-span-2 bg-surface/60 px-5 py-4 sm:col-span-1">
                  <div className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/70 uppercase">
                    Verified
                  </div>
                  <div className="mt-1 font-mono text-sm text-ink">Myfxbook · atc1111</div>
                </div>
              </div>
              <p className="px-5 py-3 font-mono text-[0.65rem] tracking-wide text-muted">
                Omnicor · {backtest.period} · {backtest.method}
              </p>
            </div>

            <div className="mt-8">
              <Button variant="primary" href={links.myfxbook} external>
                Open the live track record
              </Button>
            </div>
          </Reveal>
        </Section>
      </Container>

      {/* 04 — The Lab */}
      <Container>
        <Section index="04" label="The Lab" side="right" className="py-24 sm:py-32">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              This isn't a product you shelve. <em className="text-gold">It's a lab.</em>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              Algo Trading Center is a working research lab, not a finished catalogue. New
              pairs sit in testing, <strong className="font-semibold text-ink">PolyBot</strong>{' '}
              is in development for Q3 2026, and crypto systems come after. The next frontier
              is the <strong className="font-semibold text-ink">AI Trading Agent</strong> — a
              research desk that studies the market each session the way a hedge-fund team
              would, in active research and design. Back the lab early and you stop being a
              customer: you receive what ships at the price you came in at, and you're first
              in line for what's still being designed.
            </p>
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
              <PolyBotNote />
              <AIAgentNote />
            </div>
          </Reveal>
        </Section>
      </Container>

      {/* 05 — Reclaim Your Time (full-bleed band) */}
      <section className="relative overflow-hidden border-y border-ink/10 py-28 sm:py-40">
        <div className="hero-curve">
          <div className="absolute inset-0 opacity-30">
            <EquityCurve uid="reclaim" animate={false} />
          </div>
        </div>
        <Container size="narrow" className="relative z-10">
          <Reveal className="text-center">
            <SectionLabel index="05" className="justify-center">
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
                Founding seats are limited, and the counters are real. When a bundle fills,
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

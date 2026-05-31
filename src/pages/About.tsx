import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { PolyBotNote } from '../components/PolyBotNote'
import { AIAgentNote } from '../components/AIAgentNote'
import { Reveal } from '../components/Reveal'

const ROADMAP = [
  { when: 'In testing', what: 'New Forex pairs joining the trinity' },
  { when: 'Q3 2026', what: 'PolyBot — the approach, brought on-chain' },
  { when: 'After', what: 'Dedicated crypto systems' },
  { when: 'The frontier', what: 'The AI Trading Agent — an AI research desk, in active research & design' },
]

export function About() {
  return (
    <>
      <section className="pt-20 pb-8 sm:pt-28">
        <Container size="narrow">
          <Reveal mode="mount">
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
              About · The Time Capitalist
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] font-light text-ink sm:text-6xl">
              I didn't want a better strategy. <em className="text-gold">I wanted my evenings back.</em>
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* Opening narrative — kept narrow for readability */}
      <Container size="narrow">
        <Reveal>
          <section className="space-y-6 py-12 text-lg leading-relaxed text-muted">
            <p>
              For years I traded the way everyone tells you to — manually, screen-lit,
              convinced the next indicator was the one. It wasn't. None of them are. The
              market doesn't hand you an edge for showing up; it bills you for it, in hours
              you never get back.
            </p>
            <p>
              So I stopped hunting for a <em className="text-ink">holy grail</em> and started
              building machinery instead, one piece at a time. Three years of building,
              breaking, and rebuilding later, the algorithms did the one thing no strategy
              ever had: they kept working after I closed the laptop. I got my evenings back.
              That's the whole story — and it's the only promise on this site I'll make in
              the first person.
            </p>
          </section>
        </Reveal>
      </Container>

      {/* Numbered sections — side-rail layout fills the page width */}
      <Container>
        <div className="divide-y divide-ink/10">
          <Section index="01" label="The Lab" className="py-16 sm:py-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
                Not a storefront. The lab itself, <em className="text-gold">opened up.</em>
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
                Algo Trading Center grew out of that work. It isn't three products on a shelf —
                it's the same systems I run, handed over as I run them, with research that never
                really stops. When something improves, it improves for everyone who's already in.
              </p>
            </Reveal>
          </Section>

          <Section index="02" label="The Roadmap" side="right" className="py-16 sm:py-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
                The catalogue you see today is the smallest it will ever be.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-9 space-y-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10">
                {ROADMAP.map((r) => (
                  <li
                    key={r.when}
                    className="flex flex-col gap-1 bg-surface/50 px-6 py-5 sm:flex-row sm:items-center sm:gap-8"
                  >
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase sm:w-32">
                      {r.when}
                    </span>
                    <span className="text-ink">{r.what}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <PolyBotNote />
                <AIAgentNote />
              </div>
            </Reveal>
          </Section>

          <Section index="03" label="The Founding Promise" className="py-16 sm:py-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
                You were here first. <em className="text-gold">The pricing remembers that.</em>
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
                This is why the Founding Members Bundle exists. Come in early and you don't just
                buy what's on the shelf now — you receive everything the lab ships next, at the
                price you paid today. No upgrade invoices, no "new tier" emails. A permanent seat
                at the original number.
              </p>
            </Reveal>
          </Section>
        </div>
      </Container>

      {/* Close + CTA */}
      <section className="pt-8 pb-8">
        <Container size="narrow">
          <Reveal>
            <div className="rounded-3xl border border-gold/30 bg-surface/50 px-8 py-14 text-center sm:px-14">
              <h2 className="font-display text-3xl leading-tight font-light text-balance text-ink sm:text-4xl">
                Money comes back around. <em className="text-gold">The years don't.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
                If that lands, you already understand what we're building here.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <ClaimButton />
                <Button variant="ghost" to="/products">
                  Meet the trinity
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

import { eaPlans, billing } from '../data'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { SectionLabel } from '../components/SectionLabel'
import { RegimeReadout } from '../components/RegimeReadout'
import { UsdExposure } from '../components/UsdExposure'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

/** Five layers, in the order a decision passes through them. Kept to one line each — the
 *  readout above does the explaining, this is the index. */
const LAYERS = [
  {
    n: '01',
    k: 'Technical',
    v: 'The EA reads its own pair. Structure, levels, the setup it was built for.',
  },
  {
    n: '02',
    k: 'Macro',
    v: 'The calendar and the releases. Nothing opens ninety seconds before a rate decision.',
  },
  {
    n: '03',
    k: 'Regime',
    v: 'Volatility, trend and correlation — the three axes that decide whether a grid is in friendly water.',
  },
  {
    n: '04',
    k: 'Risk',
    v: 'Everything above collapses into one number, and that number scales the position.',
  },
  {
    n: '05',
    k: 'Reflection',
    v: 'Every decision is scored against what actually happened, and the scoring feeds back.',
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
            Most robots only see price. <em className="text-gold">Ours sees the regime.</em>
          </>
        }
        subtitle="A chart tells you what happened. It cannot tell you whether this is a market your strategy survives. That is a different question, and it needs a different system to answer it."
        size="default"
      />

      <Container>
        {/* The problem, stated in two sentences before the machinery. */}
        <Reveal>
          <p className="max-w-2xl pb-12 text-lg leading-relaxed text-muted">
            What kills a grid isn't a news spike — it's a market that simply keeps going, while
            the grid keeps averaging into it.{' '}
            <em className="text-ink">Depth is the risk. Not surprise.</em>
          </p>
        </Reveal>

        <Reveal>
          <RegimeReadout />
        </Reveal>

        {/* The five layers */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>The stack</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Five layers. <em className="text-gold">One decision.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="glass mt-9 divide-y divide-ink/10 overflow-hidden rounded-3xl">
              {LAYERS.map((l) => (
                <li key={l.n} className="flex gap-5 px-6 py-5">
                  <span className="font-mono text-sm text-gold tabular-nums">{l.n}</span>
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                    <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ink uppercase sm:w-32 sm:shrink-0">
                      {l.k}
                    </span>
                    <span className="text-muted">{l.v}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Portfolio-level exposure — the part almost nothing in retail does. */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>Portfolio, not positions</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Almost every robot manages one trade.{' '}
              <em className="text-gold">Almost none manage the book.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-9">
            <UsdExposure />
          </Reveal>
        </section>

        {/* Explanation as a feature */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>Nothing hidden</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Every decision comes with its reason.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Not a black box that says no. A line you can read, argue with, and check against
              what the market did next.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="glass mt-9 rounded-3xl p-7 sm:p-9">
              <p className="font-mono text-sm leading-relaxed text-ink">
                <span className="text-gold">Exposure reduced to 40%.</span> Dollar trend strong
                across all three pairs, correlation at 0.81 — a drawdown here would arrive on
                every book at once.
              </p>
            </blockquote>
          </Reveal>
        </section>

        <Reveal>
          <div className="glass glass-gold rounded-3xl px-7 py-12 text-center">
            <h2 className="font-display text-3xl leading-tight font-light text-balance text-ink sm:text-4xl">
              Three machines. <em className="text-gold">One that knows when to hold them back.</em>
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

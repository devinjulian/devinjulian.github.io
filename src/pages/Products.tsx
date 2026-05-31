import type { ReactNode } from 'react'
import { eas, type EA } from '../data'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { StatBlock } from '../components/StatBlock'
import { BacktestGallery } from '../components/BacktestGallery'
import { EquityCurve } from '../components/EquityCurve'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { Reveal } from '../components/Reveal'

const NARRATIVE: Record<string, ReactNode> = {
  omnicor: (
    <>
      <p>
        EURUSD is the most liquid pair on earth: the tightest spreads and deepest order
        flow the market offers. Omnicor lives there on purpose. On the M30 and H1 it sits
        slow enough to ignore the noise and fast enough to compound.
      </p>
      <p>
        Its Auto-Lot scaling grows position size with the account, so you never touch a
        setting. No set files, no babysitting — you install it once and let compounding do
        what it does to a balance left alone.
      </p>
    </>
  ),
  cenith: (
    <>
      <p>
        Cenith is built around what it <em className="text-ink">refuses</em> to lose. Its
        exhaustion-filter grid waits for a move to run out of breath before it commits —
        and on GBPUSD's M5, where impatience gets punished fastest, that restraint is the
        whole edge.
      </p>
      <p>
        Across 5,857 backtested trades it held maximum drawdown to 25.79%. The return came
        second, and on purpose: protect the capital first, and the rest takes care of
        itself.
      </p>
    </>
  ),
  golden: (
    <>
      <p>
        Gold doesn't trend. It <em className="text-ink">detonates</em> — an NFP print, an
        FOMC sentence that moves the metal a hundred dollars before you've finished reading
        it. Most systems get torn apart by exactly that. Golden is engineered for it.
      </p>
      <p>
        Independent Basket Trailing lets every position manage its own exit, so the
        strategy survives the chaos gold makes its home rather than betting against it. It
        needs set files — two, one per timeframe — because taming this market was never
        going to be plug-and-play.
      </p>
    </>
  ),
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/60 uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm text-ink">{value}</dd>
    </div>
  )
}

function EABlock({ ea }: { ea: EA }) {
  const side = ea.order % 2 === 0 ? 'right' : 'left'
  return (
    <Section
      id={ea.id}
      index={`0${ea.order}`}
      label={`${ea.pair} · ${ea.timeframes.join(' & ')}`}
      side={side}
      className="scroll-mt-24 py-16 sm:py-24"
    >
      <Reveal>
        <div className="mb-8 h-32 overflow-hidden rounded-2xl border border-ink/10 bg-surface/40 sm:h-40">
          <EquityCurve uid={ea.id} />
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display text-4xl leading-none font-light text-ink sm:text-5xl">
          {ea.name}
        </h2>
        <p className="mt-2 font-display text-xl text-gold italic">{ea.title}</p>

        <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
          <SpecItem label="Pair" value={ea.pair} />
          <SpecItem label="Timeframes" value={ea.timeframes.join(' · ')} />
          <SpecItem label="Platforms" value={ea.platforms.join(' / ')} />
          <SpecItem label="Mechanism" value={ea.mechanism} />
        </dl>
        <p className="mt-4 font-mono text-xs text-muted">{ea.setFilesNote}</p>

        <div className="mt-7 space-y-4 leading-relaxed text-muted">{NARRATIVE[ea.id]}</div>

        <div className="mt-8">
          <Button variant="ghost" href={ea.walkthrough} external>
            Watch the walkthrough
          </Button>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <StatBlock ea={ea} />
      </Reveal>

      <Reveal>
        <BacktestGallery ea={ea} />
      </Reveal>
    </Section>
  )
}

export function Products() {
  return (
    <>
      <section className="pt-20 pb-8 sm:pt-28">
        <Container>
          <Reveal mode="mount">
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
              The Algorithmic Trinity
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.04] font-light text-ink sm:text-7xl">
              Three specialists. <em className="text-gold">One smoother curve.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              A single algorithm can't be fluent in every market. So we built three — each
              one a specialist in the anatomy of its pair.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container>
        <div className="divide-y divide-ink/10">
          {eas.map((ea) => (
            <EABlock key={ea.id} ea={ea} />
          ))}

          {/* Why three */}
          <Section index="04" label="Why Three" className="py-20 sm:py-28">
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
                <Button variant="primary" to="/pricing">
                  See the bundles
                </Button>
                <ClaimButton variant="ghost" />
              </div>
            </Reveal>
          </Section>
        </div>
      </Container>
    </>
  )
}

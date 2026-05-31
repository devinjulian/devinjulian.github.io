import { eas, backtest, links } from '../data'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { PageHero } from '../components/PageHero'
import { StatBlock } from '../components/StatBlock'
import { BacktestGallery } from '../components/BacktestGallery'
import { EquityCurve } from '../components/EquityCurve'
import { Button } from '../components/Button'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

const cell = 'bg-surface/60 px-6 py-5'
const label = 'font-mono text-[0.65rem] tracking-[0.2em] text-muted/70 uppercase'

export function Results() {
  return (
    <>
      <PageHero
        kicker="Proof"
        title={
          <>
            Don't believe us. <em className="text-gold">Verify us.</em>
          </>
        }
        subtitle="A live, third-party track record you can open right now — and the full MT5 backtest behind every number on this site."
        size="default"
      />

      <Container>
        <Reveal>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
            <div className={cell}>
              <dt className={label}>Live tracking</dt>
              <dd className="mt-2 text-sm">
                <a
                  href={links.myfxbook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold transition-colors hover:text-gold-deep"
                >
                  Myfxbook — atc1111 ↗
                </a>
              </dd>
            </div>
            <div className={cell}>
              <dt className={label}>Backtest window</dt>
              <dd className="mt-2 font-mono text-sm text-ink">{backtest.period}</dd>
            </div>
            <div className={cell}>
              <dt className={label}>Method</dt>
              <dd className="mt-2 font-mono text-sm text-ink">{backtest.method}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <Button variant="primary" href={links.myfxbook} external>
              Open the live track record
            </Button>
          </div>
        </Reveal>

        <Section label="Methodology" className="py-16 sm:py-20">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Every figure is a 5-year backtest, stress-tested.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              The numbers on this site come from a {backtest.periodLabel.toLowerCase()}, run through
              a {backtest.methodLabel.toLowerCase()}: trade sequences are resampled many times to see
              how a strategy holds up across many possible orderings, not one lucky run. Wherever a
              return is shown, its maximum drawdown and profit factor sit beside it — and the live
              Myfxbook record is always one click away.
            </p>
          </Reveal>
        </Section>

        {eas.map((ea) => (
          <Section
            key={ea.id}
            index={`0${ea.order}`}
            label={`${ea.name} · ${ea.pair}`}
            side={ea.order % 2 === 0 ? 'right' : 'left'}
            className="border-t border-ink/10 py-16 sm:py-20"
          >
            <Reveal>
              <div className="mb-6 h-28 overflow-hidden rounded-2xl border border-ink/10 bg-surface/40 sm:h-36">
                <EquityCurve uid={`r-${ea.id}`} />
              </div>
              <StatBlock ea={ea} />
              <BacktestGallery ea={ea} />
            </Reveal>
          </Section>
        ))}

        <Section label="The portfolio" side="right" className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Run together, the curve smooths.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
              EURUSD, GBPUSD and gold don't bleed at the same time. So when one algorithm is
              underwater, another is usually working. Run the trinity together and the combined
              equity curve smooths into something you can actually live with.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" to="/products">
                Meet the trinity
              </Button>
              <Button variant="ghost" to="/pricing">
                See the bundles
              </Button>
            </div>
          </Reveal>
        </Section>

        <section className="border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

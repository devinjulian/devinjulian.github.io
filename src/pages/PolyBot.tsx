import { POLYMARKET_DISCLAIMER } from '../data'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { SignalPricing } from '../components/SignalPricing'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

export function PolyBot() {
  return (
    <>
      <PageHero
        kicker="Polymarket Signals"
        title={
          <>
            Read the event. <em className="text-gold">Take the side.</em>
          </>
        }
        subtitle="The same AI research desk, pointed at prediction markets — issuing signals on the crypto, macro, and market-moving political events Polymarket prices. Decision-support you execute yourself, in a forward-testing phase."
      />

      <Container size="narrow">
        <Reveal>
          <p className="inline-flex rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.7rem] tracking-[0.15em] text-signal uppercase">
            Live · manual testing
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Every call is logged in the open — taken or skipped — with the reasoning behind it.
            Results are shown as outcomes / R-multiples (reward versus the risk taken), never as
            profit promises. Live signals go to subscribers in a private channel.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <p className="rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-xs leading-relaxed text-warn">
            The public Polymarket results log is being prepared. Until it ships, follow the testing
            on Telegram.
          </p>
        </Reveal>

        <SignalPricing className="mt-10" />

        <Reveal className="mt-8">
          <p className="max-w-xl border-l-2 border-gold/40 pl-3 text-sm leading-relaxed text-muted/90">
            {POLYMARKET_DISCLAIMER}
          </p>
        </Reveal>

        <section className="mt-12 border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

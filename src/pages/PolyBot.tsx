import { POLYMARKET_DISCLAIMER } from '../data'
import { polymarketLog } from '../data/polymarketLog'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { SignalCalendar } from '../components/SignalCalendar'
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
        subtitle="The same AI desk behind the crypto signals, pointed at prediction markets — issuing live signals on the crypto, macro, and market-moving political events Polymarket prices. Decision-support you execute yourself, on your own account."
      />

      <Container size="narrow">
        <Reveal>
          <p className="inline-flex rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.7rem] tracking-[0.15em] text-signal uppercase">
            Live · issuing signals
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
            The public Polymarket results log is being prepared. Until it ships, follow along on
            Telegram.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <div className="rounded-2xl border border-ink/10 bg-surface/30 p-4 sm:p-6">
            <SignalCalendar
              sessions={polymarketLog}
              caption="Polymarket Signals daily results log — one cell per day; entries appear once the public log ships."
              emptyNote="No public entries yet — results will appear here as the log ships."
            />
          </div>
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

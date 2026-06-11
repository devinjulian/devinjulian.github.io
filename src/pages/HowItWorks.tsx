import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Pick your path',
    body: 'Every license includes all three EAs — the only choice is the tier: Partner (IB), any-broker, or source code. Pricing lives on the Forex page. Not sure which fits? Tell us your broker and goals and we will point you the right way.',
  },
  {
    n: '02',
    title: 'Message us',
    body: 'There is no on-site checkout. You message us on Telegram or by email — pre-filled with what you want — and we confirm the details and arrange payment directly.',
  },
  {
    n: '03',
    title: 'Set up your broker',
    body: 'The any-broker and source-code tiers run with any broker you like. The Partner (IB) tier is registered under one of our recommended introducing brokers (RoboForex, Exness, or Tickmill) — that is what keeps its price low.',
  },
  {
    n: '04',
    title: 'Receive your EA and license',
    body: 'You get all three EAs for MetaTrader 4 and 5, plus a license covering three trading account numbers — lifetime. The source-code tier receives the full .mq5 source instead, with no account lock.',
  },
  {
    n: '05',
    title: 'Install on MetaTrader',
    body: 'Drop the EA onto the right chart and timeframe. Omnicor and Cenith are plug-and-play; Golden includes two set files, one per timeframe.',
  },
  {
    n: '06',
    title: 'Let it run',
    body: 'For hands-off, around-the-clock trading, a VPS is recommended so the EA keeps executing even when your computer is off. You can verify everything against the live Myfxbook record.',
  },
]

export function HowItWorks() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title={
          <>
            From interested to running, <em className="text-gold">in plain steps.</em>
          </>
        }
        subtitle="You own the algorithms — you are not renting a black box. Here is exactly how you go from a question to a system trading on your account."
      />

      <Container size="narrow">
        <ol className="space-y-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
          {STEPS.map((s) => (
            <Reveal key={s.n}>
              <li className="flex gap-6 bg-surface/50 px-6 py-7">
                <span className="font-mono text-sm text-gold tabular-nums">{s.n}</span>
                <div>
                  <h2 className="font-display text-xl font-light text-ink">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-10 rounded-2xl border border-ink/10 bg-surface/40 p-6">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/80 uppercase">
              What you'll need
            </p>
            <ul className="mt-4 grid gap-2 text-muted sm:grid-cols-2">
              <li>A MetaTrader 4 or 5 account with a broker</li>
              <li>Your ATC license (included with your plan)</li>
              <li>A VPS for 24/7 running (recommended)</li>
              <li>Starting capital sized to the EA and your risk (we'll advise)</li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap gap-4">
            <ClaimButton />
            <Button variant="ghost" to="/forex">
              See pricing
            </Button>
            <Button variant="ghost" to="/faq">
              Read the FAQ
            </Button>
          </div>
        </Reveal>

        <section className="mt-12 border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

import { eaPlans, billing, capital, links } from '../data'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Pick your rate',
    body: 'Two plans, both running all three machines. Partner (IB) is the lower rate because it sits with one of our partner brokers. Any Broker costs more and asks nothing of you.',
  },
  {
    n: '02',
    title: 'Message us',
    body: 'There is no checkout to fill in. You send a message, we answer personally, and we sort the details between us — including which account size actually suits you.',
  },
  {
    n: '03',
    title: 'Set up the account',
    body: 'A broker that permits grid trading, at 1:500–1:1000 leverage. Standard account if you are starting at $10,000. Cent account if you are starting smaller — the same machines, one-hundredth of the scale.',
  },
  {
    n: '04',
    title: 'Install once',
    body: 'Drop each EA onto its chart and timeframe. Omnicor and Cenith are plug-and-play; Golden ships with two set files, one per timeframe. This is the last time you touch it.',
  },
  {
    n: '05',
    title: 'Close the laptop',
    body: 'A VPS keeps everything running while your machine is off. From here the market is no longer your problem to sit in front of. That is the entire point.',
  },
]

export function HowItWorks() {
  const entry = eaPlans[0]

  return (
    <>
      <PageHero
        kicker="How it works"
        title={
          <>
            You already know the work. <em className="text-gold">Now hand it over.</em>
          </>
        }
        subtitle="Five steps between the life where you watch charts and the one where you don't. None of them take longer than an evening."
      />

      <Container size="narrow">
        {/* The emotional core — this is Devin's own story, and it is the whole argument. */}
        <Reveal>
          <section className="space-y-5 pb-12 text-lg leading-relaxed text-muted">
            <p>
              I traded by hand for years. I know the specific tiredness of it — the second
              coffee at midnight, the chart you have looked at forty times that has nothing
              left to tell you, the setup you waited six hours for that never came.
            </p>
            <p>
              And I know the worse part: none of those hours are on your statement. The
              market pays for positions, not for attendance.{' '}
              <em className="text-ink">You were the only one keeping score of your time.</em>
            </p>
          </section>
        </Reveal>

        <Reveal>
          <ol className="space-y-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-6 bg-surface/50 px-6 py-7">
                <span className="font-mono text-sm text-gold tabular-nums">{s.n}</span>
                <div>
                  <h2 className="font-display text-xl font-light text-ink">{s.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Capital — said plainly, because the wrong account size is the fastest way to a
            bad experience, and hiding it only produces refund conversations later. */}
        <Reveal>
          <div className="mt-10 rounded-2xl border border-ink/10 bg-surface/40 p-6">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/80 uppercase">
              What you'll need
            </p>
            <ul className="mt-4 grid gap-2 text-muted sm:grid-cols-2">
              <li>An MT5 account with a grid-friendly broker</li>
              <li>{capital.standard} standard — or a cent account from $100</li>
              <li>Leverage between 1:500 and 1:1000</li>
              <li>A VPS, so it runs while you don't</li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted">{capital.standardNote}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 rounded-2xl border border-gold/30 bg-surface/50 px-7 py-10 text-center">
            <h2 className="font-display text-3xl leading-tight font-light text-ink">
              The hours don't come back. <em className="text-gold">The machines start tonight.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
              All three, from {entry.price} a {billing.period}. Stop any month you like.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <ClaimButton item={`${entry.name} — ${entry.price}/${billing.period}`}>
                Start now
              </ClaimButton>
              <Button variant="ghost" to="/proof">
                Read the record first
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="ghost" to="/forex">
              See pricing
            </Button>
            <Button variant="ghost" to="/faq">
              Read the FAQ
            </Button>
            <Button variant="ghost" href={links.myfxbook} external>
              Verify on Myfxbook
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

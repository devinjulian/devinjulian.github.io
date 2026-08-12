import { membership, membershipLadder, eaPlans, billing } from '../data'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { SectionLabel } from '../components/SectionLabel'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

/** The high-ticket page. A $2,499–$9,999 product cannot be sold from a card on a pricing
 *  grid — it needs room to justify itself, and the ladder needs to be visible whole. */
export function Membership() {
  const open = membershipLadder.stages.find((s) => s.state === 'open')
  const final = membershipLadder.stages[membershipLadder.stages.length - 1]
  const totalSeats = membershipLadder.stages.reduce((n, s) => n + s.slots, 0)
  const entry = eaPlans[0]
  const anyBroker = eaPlans[eaPlans.length - 1]
  // Computed from live prices rather than written down, so the arithmetic can never
  // contradict pricing.json. Ten years is the honest comparison for a lifetime product —
  // quoting the break-even month instead frames the same true numbers as a wait.
  const tenYearCost = anyBroker.priceAmount * 120
  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

  return (
    <>
      <PageHero
        kicker="Exclusive Membership"
        title={
          <>
            {totalSeats} seats. <em className="text-gold">Then it closes for good.</em>
          </>
        }
        subtitle="The one-time way out of paying monthly: the source code itself, lifetime access, and every release the lab ever ships. A fixed number of places, and no more after that."
        size="default"
      />

      <Container>
        {/* The ladder leads — seeing the future prices is the whole mechanism. */}
        <Reveal>
          <div className="glass glass-gold rounded-3xl p-7 sm:p-9">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                  Joining now
                </p>
                <p className="mt-3 font-display text-5xl font-light text-ink sm:text-6xl">
                  {membership.price}
                  <span className="ml-3 font-mono text-[0.7rem] tracking-[0.15em] text-muted uppercase">
                    one-time
                  </span>
                </p>
              </div>
              {open && (
                <p className="font-mono text-sm tracking-[0.15em] text-gold uppercase">
                  {open.slotsLeft} of {open.slots} seats left
                </p>
              )}
            </div>

            <ul className="mt-9 space-y-4">
              {membershipLadder.stages.map((s, i) => (
                <li
                  key={s.price}
                  className={`flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4 last:border-0 ${
                    s.state === 'soldOut' ? 'opacity-45' : ''
                  }`}
                >
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
                    Stage {i + 1}
                  </span>
                  <span
                    className={`font-display text-2xl font-light sm:text-3xl ${
                      s.state === 'open' ? 'text-gold' : 'text-ink'
                    } ${s.state === 'soldOut' ? 'line-through' : ''}`}
                  >
                    {s.price}
                  </span>
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
                    {s.state === 'open'
                      ? `${s.slotsLeft} of ${s.slots} left`
                      : s.state === 'soldOut'
                        ? 'Sold out'
                        : `${s.slots} seats`}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-sm leading-relaxed text-muted">
              The price never comes back down. When the last of the {totalSeats} seats goes,
              the programme closes permanently and a monthly plan becomes the only way in.
            </p>

            <div className="mt-8">
              <ClaimButton item={`${membership.name} (${membership.price})`} className="w-full">
                Claim a seat at {membership.price}
              </ClaimButton>
            </div>
          </div>
        </Reveal>

        {/* What you get */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>What a seat carries</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Everything a plan gives you. <em className="text-gold">Then everything it can't.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="glass mt-9 divide-y divide-ink/10 overflow-hidden rounded-3xl">
              {membership.benefits.map((b) => (
                <div key={b.k} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-8">
                  <dt className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase sm:w-44 sm:shrink-0">
                    {b.k}
                  </dt>
                  <dd className="text-ink">{b.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* The arithmetic, computed from live prices */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>The arithmetic</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Once. <em className="text-gold">Not every month for the rest of your life.</em>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Ten years on the Any Broker plan comes to {fmt(tenYearCost)}. A seat is{' '}
              {membership.price}, paid once — and it doesn't stop at ten years.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
              If you would rather not commit, {entry.name} starts at {entry.price} a{' '}
              {billing.period} and you can stop any month.
            </p>
            <div className="mt-8">
              <Button variant="ghost" to="/forex">
                Compare the monthly plans
              </Button>
            </div>
          </Reveal>
        </section>

        {/* At this price the real question is what it is not. */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>What it is not</SectionLabel>
            <ul className="mt-7 max-w-2xl space-y-3 text-lg leading-relaxed text-muted">
              {membership.notIncluded.map((n) => (
                <li key={n} className="flex gap-3">
                  <span aria-hidden className="text-gold">
                    —
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <Reveal>
          <div className="glass glass-gold rounded-3xl px-7 py-12 text-center">
            <h2 className="font-display text-3xl leading-tight font-light text-balance text-ink sm:text-4xl">
              {open ? `${open.slotsLeft} left at ${open.price}.` : `${final.price} is the last price.`}{' '}
              <em className="text-gold">Then {final.price} is the last price there is.</em>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ClaimButton item={`${membership.name} (${membership.price})`}>
                Claim a seat
              </ClaimButton>
              <Button variant="ghost" to="/how-it-works">
                How it works
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

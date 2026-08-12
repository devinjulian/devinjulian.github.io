import { eas, links, eaPlans, billing, capital, membership, membershipLadder, brokers } from '../data'
import { Container } from '../components/Container'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { PageHero } from '../components/PageHero'
import { EACard } from '../components/EACard'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { Reveal } from '../components/Reveal'

/** The EA product page — three machines, monthly access, and the one-time way out of
 *  monthly. Everything renders from pricing.json so the page can never drift. */
export function Products() {
  const openSlot = membershipLadder.stages.find((s) => s.state === 'open')

  return (
    <>
      <PageHero
        kicker="The Machines"
        title={
          <>
            You stop watching. <em className="text-gold">They don't.</em>
          </>
        }
        subtitle="Three Forex algorithms, each a specialist in the anatomy of its pair. They take the setups you used to sit up waiting for — and they take them without you."
        size="default"
      />

      <Container>
        <div className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {eas.map((ea, i) => (
            <Reveal key={ea.id} delay={i * 0.1} className="h-full">
              <EACard ea={ea} />
            </Reveal>
          ))}
        </div>

        <Section label="Why Three" className="border-t border-ink/10 py-16 sm:py-24">
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
              Correlation is the quiet killer of single-system accounts.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-muted">
              EURUSD, GBPUSD and gold don't bleed at the same time. When one is underwater,
              another is usually working — and the combined curve smooths into something you
              can live with.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button variant="ghost" href={links.myfxbook} external>
                See the track record
              </Button>
            </div>
          </Reveal>
        </Section>

        {/* Pricing — monthly access, two rates (v2.0, 2026-08-12) */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              All three machines. <em className="text-gold">One monthly rate.</em>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              The EAs are never sold separately — every plan runs all three. The only
              decision is which broker you trade with.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {eaPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="glass relative flex h-full flex-col rounded-3xl p-7"
                >
                  <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                    {plan.name}
                  </p>
                  <p className="mt-4 font-display text-4xl font-light text-ink">
                    {plan.price}
                    <span className="ml-2 font-mono text-[0.65rem] tracking-[0.15em] text-muted/80 uppercase">
                      / {billing.period}
                    </span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{plan.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm leading-relaxed text-muted">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <span aria-hidden className="text-gold">
                          ·
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.ibNote && (
                    <p className="mt-5 text-xs leading-relaxed text-muted/80">
                      {plan.ibNote} — listed below.
                    </p>
                  )}
                  <div className="mt-6">
                    <ClaimButton
                      item={`${plan.name} — ${plan.price}/${billing.period}`}
                      variant={plan.requiresIB ? 'primary' : 'ghost'}
                      className="w-full"
                    >
                      Start {plan.name}
                    </ClaimButton>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted">
              {billing.note} Payment {billing.payment}.
            </p>
          </Reveal>
        </section>

        {/* What it takes to run — stated plainly, because the wrong account size is the
            fastest way for a member to have a bad experience. */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>What you need</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Start at {capital.standard} — <em className="text-gold">or start at $100.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              <div className="glass rounded-3xl p-7">
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/80 uppercase">
                  Standard account
                </p>
                <p className="mt-4 font-display text-3xl font-light text-ink">
                  {capital.standard}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {capital.standardNote}
                </p>
              </div>

              <div className="glass glass-gold rounded-3xl p-7">
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                  {capital.centLabel}
                </p>
                <p className="mt-4 font-display text-3xl font-light text-ink">from $100</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{capital.centNote}</p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted">{capital.brokerNote}</p>

            {/* IB brokers — stated plainly, not hidden */}
            <div className="glass mt-8 rounded-2xl p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/80 uppercase">
                The Partner (IB) rate requires one of these brokers
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {brokers.map((br) => (
                  <a
                    key={br.name}
                    href={br.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    {br.name}
                    {br.note && (
                      <span className="font-mono text-[0.65rem] text-muted">{br.note}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* The one-time exit from monthly — finite, and it closes for good. */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel>Exclusive Membership</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Or stop paying monthly. <em className="text-gold">Permanently.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
              <div className="glass glass-gold rounded-3xl p-7">
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                  {membership.name}
                </p>
                <p className="mt-4 font-display text-4xl font-light text-ink">
                  {membership.price}
                  <span className="ml-2 font-mono text-[0.65rem] tracking-[0.15em] text-muted/80 uppercase">
                    one-time
                  </span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{membership.tagline}</p>
                <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-muted">
                  {membership.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span aria-hidden className="text-gold">
                        ·
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ClaimButton
                    item={`${membership.name} (${membership.price})`}
                    className="w-full"
                  >
                    Claim {membership.name}
                  </ClaimButton>
                </div>
              </div>

              {/* The ladder, shown whole — future prices included. Seeing $9,999 beside
                  $2,499 is the mechanism; hiding it removes the reason to act. */}
              <div className="glass rounded-3xl p-7">
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/80 uppercase">
                  The ladder
                </p>
                <ul className="mt-5 space-y-4">
                  {membershipLadder.stages.map((s, i) => (
                    <li
                      key={s.price}
                      className={`flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4 last:border-0 ${
                        s.state === 'soldOut' ? 'opacity-50' : ''
                      }`}
                    >
                      <span className="font-mono text-[0.65rem] tracking-[0.15em] text-muted/80 uppercase">
                        Stage {i + 1}
                      </span>
                      <span
                        className={`font-display text-2xl font-light ${
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
                            : `${s.slots} slots`}
                      </span>
                    </li>
                  ))}
                </ul>
                {membershipLadder.closesAfterFinal && (
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    When the final slot goes, the programme closes for good — and a monthly
                    plan becomes the only way in.
                  </p>
                )}
              </div>
            </div>

            {openSlot && (
              <p className="mt-6 font-mono text-[0.7rem] tracking-[0.15em] text-gold uppercase">
                {openSlot.slotsLeft} of {openSlot.slots} slots left at {openSlot.price} — the
                price never comes back down
              </p>
            )}
          </Reveal>
        </section>

        <section className="border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

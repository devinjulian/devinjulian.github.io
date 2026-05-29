import { bundles, individualEAs, polybot, scarcityNote, brokers } from '../data'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { BundleCard } from '../components/BundleCard'
import { ClaimButton } from '../components/ClaimButton'
import { RiskDisclaimer } from '../components/RiskDisclaimer'
import { PolyBotNote } from '../components/PolyBotNote'
import { Reveal } from '../components/Reveal'

export function Pricing() {
  return (
    <>
      <section className="pt-20 pb-8 sm:pt-28">
        <Container>
          <Reveal mode="mount">
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">Pricing</p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.04] font-light text-ink sm:text-7xl">
              Own the lab. <em className="text-gold">Not a rental.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              One-time, lifetime pricing — no subscriptions. You buy by talking to a human,
              not a checkout. Pick the path that fits, then message us to claim your spot.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Early Phase Bundles */}
      <Container>
        <section className="py-12">
          <Reveal>
            <SectionLabel index="01">Early Phase Bundles</SectionLabel>
          </Reveal>
          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
            {bundles.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.1} className="h-full">
                <BundleCard bundle={b} />
              </Reveal>
            ))}
          </div>

          {/* IB brokers — stated plainly, not hidden */}
          <Reveal className="mt-8">
            <div className="rounded-xl border border-ink/10 bg-surface/30 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
                Partner plans require one of these brokers
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

          {/* Honest scarcity */}
          <Reveal className="mt-6">
            <p className="border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted">
              {scarcityNote}
            </p>
          </Reveal>
        </section>

        {/* Individual EAs */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel index="02">Individual EAs</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
              Rather start with one? Each algorithm stands on its own.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/15 font-mono text-[0.65rem] tracking-[0.2em] text-muted/70 uppercase">
                    <th className="py-3 pr-4 font-normal">EA</th>
                    <th className="py-3 pr-4 font-normal">Pair</th>
                    <th className="py-3 pr-4 font-normal">Partner (IB)</th>
                    <th className="py-3 pr-4 font-normal">Any broker</th>
                    <th className="py-3 font-normal">Source code</th>
                  </tr>
                </thead>
                <tbody>
                  {individualEAs.map((row) => (
                    <tr key={row.ea} className="border-b border-ink/5">
                      <td className="py-4 pr-4 font-display text-lg text-ink">{row.ea}</td>
                      <td className="py-4 pr-4 font-mono text-sm text-muted">{row.pair}</td>
                      <td className="py-4 pr-4">
                        <span className="font-mono text-sm text-ink">{row.partnerIB}</span>
                        <span className="block font-mono text-[0.65rem] text-muted/70">
                          {row.partnerLicenses}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="font-mono text-sm text-ink">{row.anyBroker}</span>
                        <span className="block font-mono text-[0.65rem] text-muted/70">
                          {row.anyBrokerLicenses}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-mono text-sm text-gold">{row.sourceCode}</span>
                        <span className="block font-mono text-[0.65rem] text-muted/70">
                          .mq5 · instant
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <ClaimButton item="an individual EA" variant="ghost">
                Claim an individual EA
              </ClaimButton>
            </div>
          </Reveal>
        </section>

        {/* PolyBot */}
        <section className="border-t border-ink/10 py-16 sm:py-20">
          <Reveal>
            <SectionLabel index="03">PolyBot</SectionLabel>
          </Reveal>
          <div className="mt-7 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
                The next chapter — <em className="text-gold">not yet open.</em>
              </h2>
              <p className="mt-3 inline-flex rounded-full border border-signal/40 px-3 py-1 font-mono text-[0.7rem] tracking-[0.15em] text-signal uppercase">
                {polybot.status}
              </p>
              <p className="mt-6 max-w-md leading-relaxed text-muted">
                PolyBot moves the lab on-chain. Pricing is published for transparency, but
                nothing ships until launch — and Founding Members receive the full Python
                source the moment it does.
              </p>
              <PolyBotNote className="mt-7 max-w-md" />
            </Reveal>

            <Reveal delay={0.12} className="space-y-6">
              <div className="rounded-xl border border-ink/10 bg-surface/40 p-6">
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
                  Standalone · available after launch
                </p>
                <ul className="mt-4 space-y-3">
                  {polybot.standalone.map((t) => (
                    <li key={t.tier} className="flex items-baseline justify-between gap-4">
                      <span className="text-ink">
                        {t.tier} <span className="text-sm text-muted">· {t.detail}</span>
                      </span>
                      <span className="font-mono text-ink tabular-nums">{t.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-gold/25 bg-surface/40 p-6">
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
                  {polybot.earlyBird.note}
                </p>
                <ul className="mt-4 space-y-3">
                  {polybot.earlyBird.tiers.map((t) => (
                    <li key={t.tier} className="flex items-baseline justify-between gap-4">
                      <span className="text-ink">
                        {t.tier} <span className="text-sm text-muted">· {t.detail}</span>
                      </span>
                      <span className="font-mono text-gold tabular-nums">{t.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <ClaimButton item="the PolyBot early-bird waitlist" variant="ghost" size="sm">
                    Join the waitlist
                  </ClaimButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-ink/10 py-12">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

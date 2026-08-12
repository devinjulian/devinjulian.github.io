import { eaPlans, billing, links } from '../data'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { Reveal } from '../components/Reveal'

/** The trust page. A solo operator selling a leveraged product, paid by direct transfer,
 *  has to answer "who am I sending money to" — nothing else on the site does that.
 *  Kept short on purpose: this is a sales site, not a memoir. */
const FACTS = [
  { k: 'Built by', v: 'Devin Julian — one person, no team, no fund' },
  { k: 'Since', v: 'Three years of building, breaking and rebuilding' },
  { k: 'Verified', v: 'Third-party track record on Myfxbook' },
  { k: 'Sold as', v: 'A monthly plan you can stop any month' },
  { k: 'Never', v: 'Managed accounts, pooled funds, or your money in my hands' },
]

export function About() {
  const entry = eaPlans[0]

  return (
    <>
      <section className="pt-20 pb-8 sm:pt-28">
        <Container size="narrow">
          <Reveal mode="mount">
            <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
              About · The Time Capitalist
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] font-light text-ink sm:text-6xl">
              I didn't want a better strategy.{' '}
              <em className="text-gold">I wanted my evenings back.</em>
            </h1>
          </Reveal>
        </Container>
      </section>

      <Container size="narrow">
        <Reveal>
          <div className="space-y-5 pb-12 text-lg leading-relaxed text-muted">
            <p>
              I traded by hand for years, convinced the next indicator was the one. It wasn't.
              None of them are. The market doesn't hand you an edge for showing up — it bills
              you for it, in hours you never get back.
            </p>
            <p>
              So I stopped hunting and started building. Three years later the algorithms did
              the one thing no strategy ever had:{' '}
              <em className="text-ink">they kept working after I closed the laptop.</em>
            </p>
          </div>
        </Reveal>

        {/* The part that actually converts on a page like this — plain facts about who is
            on the other end of the transfer. */}
        <Reveal>
          <dl className="glass divide-y divide-ink/10 overflow-hidden rounded-3xl">
            {FACTS.map((f) => (
              <div key={f.k} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:gap-8">
                <dt className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase sm:w-28 sm:shrink-0">
                  {f.k}
                </dt>
                <dd className="text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <div className="glass glass-gold mt-10 rounded-3xl px-7 py-12 text-center">
            <h2 className="font-display text-3xl leading-tight font-light text-balance text-ink sm:text-4xl">
              Money comes back around. <em className="text-gold">The years don't.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
              All three machines from {entry.price} a {billing.period}.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <ClaimButton item={`${entry.name} — ${entry.price}/${billing.period}`}>
                Start now
              </ClaimButton>
              <Button variant="ghost" to="/forex">
                See the machines
              </Button>
              <Button variant="ghost" href={links.myfxbook} external>
                Verify on Myfxbook
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  )
}

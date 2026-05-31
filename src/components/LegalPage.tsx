import { Container } from './Container'
import { Reveal } from './Reveal'
import { RiskDisclaimer } from './RiskDisclaimer'
import { PageHero } from './PageHero'
import type { LegalDoc } from '../content/legal'

/** Renders a long-form legal document: hero, optional draft notice, sections, risk disclaimer. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero kicker={doc.kicker} title={doc.title} subtitle={doc.intro} />

      <Container size="narrow">
        {doc.draft && (
          <Reveal>
            <p className="rounded-xl border border-warn/40 bg-warn/[0.06] px-5 py-4 text-sm leading-relaxed text-warn">
              Draft for review — this document is a starting point, not yet legal advice, and
              some details are still being finalized. Please review and adapt it before relying on it.
            </p>
          </Reveal>
        )}

        <Reveal>
          <p className="mt-8 font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
            Last updated · {doc.updated}
          </p>
        </Reveal>

        <div className="mt-8 space-y-10">
          {doc.sections.map((s) => (
            <Reveal key={s.heading}>
              <section>
                <h2 className="font-display text-2xl leading-tight font-light text-ink">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <section className="mt-12 border-t border-ink/10 py-10">
          <RiskDisclaimer className="max-w-3xl" />
        </section>
      </Container>
    </>
  )
}

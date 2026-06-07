import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { FaqList } from '../components/FaqList'
import { JsonLd } from '../components/JsonLd'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { Reveal } from '../components/Reveal'
import { faqGroups } from '../data/faq'

export function Faq() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqGroups
            .flatMap((g) => g.items)
            .map((it) => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
        }}
      />
      <PageHero
        kicker="FAQ"
        title={
          <>
            The questions <em className="text-gold">before</em> the message.
          </>
        }
        subtitle="The things people ask most before they reach out. If yours isn't here, ask us directly — a real person answers."
      />

      <Container size="narrow">
        <FaqList />

        <Reveal>
          <div className="mt-14 rounded-2xl border border-gold/30 bg-surface/50 px-8 py-12 text-center">
            <h2 className="font-display text-2xl leading-tight font-light text-ink sm:text-3xl">
              Still have a question?
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
              Message us and we'll walk you through it — no pressure, no checkout.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <ClaimButton>Message us</ClaimButton>
              <Button variant="ghost" to="/how-it-works">
                How it works
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  )
}

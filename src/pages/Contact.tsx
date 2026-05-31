import { links } from '../data'
import { telegramHref, emailHref, buildMessage } from '../lib/contact'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { ClaimButton } from '../components/ClaimButton'
import { Reveal } from '../components/Reveal'

export function Contact() {
  const message = buildMessage()

  return (
    <>
      <PageHero
        kicker="Contact"
        title={
          <>
            Two ways in. <em className="text-gold">No checkout.</em>
          </>
        }
        subtitle="Payments are handled by direct contact, not an on-site card form. Message Devin on whichever channel suits you — he takes it from there personally."
      />

      <Container size="narrow">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface/40 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
                Telegram
              </p>
              <p className="mt-2 text-ink">{links.telegramHandle}</p>
              <div className="mt-6">
                <a
                  href={telegramHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-gold px-5 py-2.5 font-mono text-xs tracking-[0.15em] text-void uppercase transition-colors hover:bg-gold-deep"
                >
                  Open Telegram
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface/40 p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
                Email
              </p>
              <p className="mt-2 break-all text-ink">{links.email}</p>
              <div className="mt-6">
                <a
                  href={emailHref()}
                  className="inline-flex rounded-full border border-ink/20 px-5 py-2.5 font-mono text-xs tracking-[0.15em] text-ink uppercase transition-colors hover:border-gold/60 hover:text-gold"
                >
                  Open email
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-6 rounded-2xl border border-ink/10 bg-void/40 p-6">
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted/70 uppercase">
              A message that says it all
            </p>
            <p className="mt-3 leading-relaxed text-muted italic">“{message}”</p>
            <p className="mt-4 text-sm text-muted">
              Want the guided version that pre-fills which bundle you're after?{' '}
            </p>
            <div className="mt-3">
              <ClaimButton>Open the claim panel</ClaimButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  )
}

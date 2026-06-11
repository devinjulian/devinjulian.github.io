import { Container } from '../components/Container'
import { Button } from '../components/Button'

export function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <Container size="narrow" className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">404</p>
        <h1 className="mt-6 font-display text-5xl leading-tight font-light text-ink">
          This page slipped through the <em className="text-gold">void.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-sm leading-relaxed text-muted">
          The link is broken, but the trinity isn't. Let's get you back to something real.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/">Back home</Button>
          <Button variant="ghost" to="/forex">
            See pricing
          </Button>
        </div>
      </Container>
    </section>
  )
}

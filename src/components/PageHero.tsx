import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'

/** Standard top-of-page hero for the content pages (kicker + display title + sub). */
export function PageHero({
  kicker,
  title,
  subtitle,
  size = 'narrow',
}: {
  kicker: string
  title: ReactNode
  subtitle?: ReactNode
  size?: 'narrow' | 'default'
}) {
  return (
    <section className="pt-20 pb-8 sm:pt-28">
      <Container size={size}>
        <Reveal mode="mount">
          <p className="font-mono text-xs tracking-[0.3em] text-gold uppercase">{kicker}</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.06] font-light text-ink sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>
          )}
        </Reveal>
      </Container>
    </section>
  )
}

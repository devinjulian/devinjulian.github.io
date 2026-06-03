import { useParams, Navigate, Link } from 'react-router-dom'
import { eas, getEA } from '../data'
import { Container } from '../components/Container'
import { EquityCurve } from '../components/EquityCurve'
import { StatBlock } from '../components/StatBlock'
import { BacktestGallery } from '../components/BacktestGallery'
import { Button } from '../components/Button'
import { ClaimButton } from '../components/ClaimButton'
import { Reveal } from '../components/Reveal'
import { JsonLd } from '../components/JsonLd'
import { eaNarratives } from '../content/eaNarratives'

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.6rem] tracking-[0.2em] text-muted/60 uppercase">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-ink">{value}</dd>
    </div>
  )
}

export function ProductDetail() {
  const { id } = useParams()
  const ea = id ? getEA(id) : undefined
  if (!ea) return <Navigate to="/forex" replace />

  const idx = eas.findIndex((e) => e.id === ea.id)
  const prev = eas[(idx - 1 + eas.length) % eas.length]
  const next = eas[(idx + 1) % eas.length]

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${ea.name} — ${ea.pair} Expert Advisor`,
          description: ea.tagline,
          brand: { '@type': 'Brand', name: 'Algo Trading Center' },
          category: 'Trading software (Expert Advisor)',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Forex Bots', item: 'https://devinjulian.github.io/forex' },
            {
              '@type': 'ListItem',
              position: 2,
              name: ea.name,
              item: `https://devinjulian.github.io/forex/${ea.id}`,
            },
          ],
        }}
      />
      <section className="pt-16 pb-8 sm:pt-24">
        <Container>
          <Reveal mode="mount">
            <Link
              to="/forex"
              className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase transition-colors hover:text-gold"
            >
              ← The Trinity
            </Link>
            <p className="mt-6 font-mono text-xs tracking-[0.3em] text-gold uppercase">
              {ea.pair} · {ea.timeframes.join(' & ')}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none font-light text-ink sm:text-7xl">
              {ea.name}
            </h1>
            <p className="mt-3 font-display text-2xl text-gold italic">{ea.title}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{ea.tagline}</p>
          </Reveal>

          <Reveal className="mt-10">
            <div className="h-40 overflow-hidden rounded-2xl border border-ink/10 bg-surface/40 sm:h-56">
              <EquityCurve uid={ea.id} />
            </div>
          </Reveal>
        </Container>
      </section>

      <Container>
        <div className="grid gap-12 py-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <dl className="flex flex-wrap gap-x-8 gap-y-4">
              <SpecItem label="Pair" value={ea.pair} />
              <SpecItem label="Timeframes" value={ea.timeframes.join(' · ')} />
              <SpecItem label="Platforms" value={ea.platforms.join(' / ')} />
              <SpecItem label="Mechanism" value={ea.mechanism} />
            </dl>
            <p className="mt-4 font-mono text-xs text-muted">{ea.setFilesNote}</p>
            <div className="mt-7 space-y-4 leading-relaxed text-muted">{eaNarratives[ea.id]}</div>
            <div className="mt-8">
              <Button variant="ghost" href={ea.walkthrough} external>
                Watch the walkthrough
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <StatBlock ea={ea} />
            <BacktestGallery ea={ea} />
          </Reveal>
        </div>

        <section className="border-t border-ink/10 py-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-6 font-mono text-[0.7rem] tracking-[0.15em] uppercase">
              <Link to={`/forex/${prev.id}`} className="text-muted transition-colors hover:text-gold">
                ← {prev.name}
              </Link>
              <Link to={`/forex/${next.id}`} className="text-muted transition-colors hover:text-gold">
                {next.name} →
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              <ClaimButton item={`${ea.name} EA`} />
              <Button variant="ghost" to="/pricing">
                See pricing
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}

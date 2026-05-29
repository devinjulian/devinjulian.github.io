import { Link } from 'react-router-dom'
import { links } from '../data'
import { Container } from './Container'
import { Wordmark } from './Wordmark'
import { RiskDisclaimer } from './RiskDisclaimer'

const colClass = 'font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase'
const itemClass = 'text-sm text-muted transition-colors hover:text-ink'

function Ext({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={itemClass}>
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-ink/10">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A trading lab building algorithms that buy back your hours — with results you
              can verify, not just believe.
            </p>
          </div>

          <nav aria-label="Pages" className="flex flex-col gap-3">
            <p className={colClass}>Explore</p>
            <Link to="/products" className={itemClass}>
              Products
            </Link>
            <Link to="/pricing" className={itemClass}>
              Pricing
            </Link>
            <Link to="/about" className={itemClass}>
              About
            </Link>
          </nav>

          <nav aria-label="Proof" className="flex flex-col gap-3">
            <p className={colClass}>Proof</p>
            <Ext href={links.myfxbook}>Live results — Myfxbook</Ext>
            <Ext href={links.backupPricing}>Backup pricing page</Ext>
          </nav>

          <nav aria-label="Connect" className="flex flex-col gap-3">
            <p className={colClass}>Connect</p>
            <Ext href={links.telegram}>Telegram</Ext>
            <a href={`mailto:${links.email}`} className={itemClass}>
              Email
            </a>
          </nav>
        </div>

        <hr className="rule-gold my-12" />

        <RiskDisclaimer className="max-w-3xl" />

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-ink/5 pt-6 font-mono text-[0.7rem] tracking-[0.15em] text-muted uppercase sm:flex-row">
          <span>© {new Date().getFullYear()} Algo Trading Center</span>
          <span>The Time Capitalist</span>
        </div>
      </Container>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { links } from '../data'
import { Container } from './Container'
import { Wordmark } from './Wordmark'
import { RiskDisclaimer } from './RiskDisclaimer'

const colClass = 'font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase'
const itemClass = 'text-sm text-muted transition-colors hover:text-ink'
const legalClass =
  'font-mono text-[0.65rem] tracking-[0.15em] text-muted/80 uppercase transition-colors hover:text-ink'

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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A trading lab building algorithms that buy back your hours — with results you
              can verify, not just believe.
            </p>
          </div>

          <nav aria-label="Explore" className="flex flex-col gap-3">
            <p className={colClass}>Explore</p>
            <Link to="/forex" className={itemClass}>
              Forex Bots
            </Link>
            <Link to="/crypto-futures-signals" className={itemClass}>
              Crypto Futures Signals
            </Link>
            <Link to="/about" className={itemClass}>
              About
            </Link>
          </nav>

          <nav aria-label="Support" className="flex flex-col gap-3">
            <p className={colClass}>Support</p>
            <Link to="/how-it-works" className={itemClass}>
              How it works
            </Link>
            <Link to="/faq" className={itemClass}>
              FAQ
            </Link>
            <Link to="/contact" className={itemClass}>
              Contact
            </Link>
          </nav>

          <nav aria-label="Proof" className="flex flex-col gap-3">
            <p className={colClass}>Proof</p>
            <Ext href={links.myfxbook}>Live results — Myfxbook</Ext>
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

        <nav
          aria-label="Legal"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          <Link to="/risk-disclosure" className={legalClass}>
            Risk Disclosure
          </Link>
          <Link to="/terms" className={legalClass}>
            Terms
          </Link>
          <Link to="/privacy" className={legalClass}>
            Privacy
          </Link>
          <Link to="/refunds" className={legalClass}>
            Refunds
          </Link>
        </nav>

        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-ink/5 pt-6 font-mono text-[0.7rem] tracking-[0.15em] text-muted uppercase sm:flex-row">
          <span>© {new Date().getFullYear()} Algo Trading Center</span>
          <span>The Time Capitalist</span>
        </div>
      </Container>
    </footer>
  )
}

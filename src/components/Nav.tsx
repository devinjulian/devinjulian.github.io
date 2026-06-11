import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'
import { Wordmark } from './Wordmark'
import { ClaimButton } from './ClaimButton'
import { Menu, Close } from './icons'

const LINKS = [
  { to: '/forex', label: 'Forex Bots' },
  { to: '/crypto-futures-signals', label: 'Crypto Futures Signals' },
  { to: '/polymarket', label: 'Polymarket Signals' },
  { to: '/about', label: 'About' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'font-mono text-xs uppercase tracking-[0.2em] transition-colors',
    isActive ? 'text-gold' : 'text-muted hover:text-ink',
  )

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-void/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link to="/" aria-label="Algo Trading Center — home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <ClaimButton size="sm" />
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-ink/10 bg-void/95 md:hidden">
          <nav aria-label="Primary" className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'py-2 font-mono text-sm uppercase tracking-[0.2em] transition-colors',
                    isActive ? 'text-gold' : 'text-muted hover:text-ink',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-3" onClick={() => setOpen(false)}>
              <ClaimButton size="sm" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

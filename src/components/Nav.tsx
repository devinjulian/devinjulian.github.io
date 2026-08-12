import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'
import { Wordmark } from './Wordmark'
import { Menu, Close } from './icons'

const LINKS = [
  { to: '/forex', label: 'The Machines' },
  { to: '/ai-agent', label: 'AI Agent' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/exclusive', label: 'Exclusive' },
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
    <header className="sticky top-0 z-50 bg-ink/5 shadow-[inset_0_-1px_0_0_rgb(255_255_255/0.07),inset_0_1px_0_0_rgb(255_255_255/0.12)] backdrop-blur-xl backdrop-saturate-150">
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
          </nav>
        </div>
      )}
    </header>
  )
}

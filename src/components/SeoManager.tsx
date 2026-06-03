import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getEA } from '../data'

const SITE = 'https://devinjulian.github.io'
const OG = `${SITE}/og.png`
const BRAND = 'Algo Trading Center'

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${BRAND} — The Time Capitalist`,
    description:
      'Automation that buys back your hours. Real Forex algorithms with verifiable live results — not a get-rich scheme.',
  },
  '/forex': {
    title: 'Forex Trading Bots — Omnicor, Cenith, Golden',
    description:
      'Three Forex MT4/MT5 expert advisors — EURUSD, GBPUSD and gold — each a specialist, with verified 2021–2026 backtests.',
  },
  '/polybot': {
    title: 'PolyBot — on-chain trading bot (in development)',
    description:
      'PolyBot moves the lab on-chain. In development, public launch Q3 2026. No performance claims are made.',
  },
  '/ai-agent': {
    title: 'AI Trading Agent — in active research',
    description:
      "The lab's next frontier: an AI research desk for decision-support. In active research and design; no performance claims.",
  },
  '/pricing': {
    title: 'Pricing — bundles & individual EAs',
    description:
      'One-time, lifetime pricing for the ATC algorithms. Bundles, individual EAs and PolyBot — purchase by direct contact.',
  },
  '/results': {
    title: 'Results — verified live track record & backtests',
    description:
      'A live Myfxbook track record plus the full MT5 backtest behind every number. 2021–2026, Monte Carlo method.',
  },
  '/about': {
    title: 'About — the trading lab',
    description:
      'How Algo Trading Center went from manual trading to building algorithms that keep working after the laptop closes.',
  },
  '/how-it-works': {
    title: 'How it works — from interested to running',
    description: 'Requirements and the contact-to-own flow for the Algo Trading Center algorithms.',
  },
  '/faq': {
    title: 'FAQ',
    description:
      'Common pre-sale questions about the ATC algorithms, licenses, brokers, results, and PolyBot.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Reach ATC on Telegram or email. No on-site checkout — purchase by direct contact.',
  },
  '/risk-disclosure': {
    title: 'Risk Disclosure',
    description: 'The risks of algorithmic and leveraged trading, and how ATC presents backtested results.',
  },
  '/terms': {
    title: 'Terms & License',
    description: 'Terms of use and the software license for Algo Trading Center Expert Advisors.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'What Algo Trading Center collects when you get in touch, and how it is used.',
  },
  '/refunds': {
    title: 'Refund & Purchase Policy',
    description: 'How purchases work (by direct contact) and our stance on refunds for digital products.',
  },
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function metaFor(pathname: string): { title: string; description: string } {
  if (META[pathname]) return META[pathname]
  const m = pathname.match(/^\/forex\/(.+)$/)
  if (m) {
    const ea = getEA(m[1])
    if (ea) {
      return {
        title: `${ea.name} — ${ea.pair} MT5 Expert Advisor`,
        description: `${ea.name} (${ea.title}): ${ea.pair}, ${ea.timeframes.join(' & ')}. Verified MT5 backtest, 2021–2026, Monte Carlo.`,
      }
    }
  }
  return META['/']
}

/** Central per-route head: title, description, canonical, Open Graph, Twitter.
 *  Client-side (no SSG) — Google renders the SPA and reads the updated head. */
export function SeoManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const { title, description } = metaFor(pathname)
    const isHome = pathname === '/'
    const full = isHome ? title : `${title} | ${BRAND}`
    const url = isHome ? SITE : SITE + pathname
    document.title = full
    upsertMeta('name', 'description', description)
    upsertLink('canonical', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', full)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', OG)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', full)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', OG)
  }, [pathname])
  return null
}

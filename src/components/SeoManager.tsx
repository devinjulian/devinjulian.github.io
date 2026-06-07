import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getEA, SITE, OG, BRAND } from '../data'
import seoMeta from '../data/seoMeta.json'

// Static-route meta — single source of truth, shared with the build-time prerender
// (scripts/prerender.mjs), which reads the same JSON. Site constants live in ../data.
const META: Record<string, { title: string; description: string }> = seoMeta.routes

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
      // NOTE: keep this /forex/:id template in sync with scripts/prerender.mjs (forexMeta()).
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

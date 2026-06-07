// Build-time static-meta prerender (head-only — NOT body SSG; keeps the SPA).
//
// Why: SeoManager sets per-route <title>/description/OG client-side. Google renders
// JS, but social/link-preview crawlers (Facebook, LinkedIn, Slack, WhatsApp, Discord, X)
// do not — without this they all see the generic homepage preview. This script writes a
// real HTML file per route with the correct, crawler-visible head, so GitHub Pages serves
// it directly. Vite 8 / React Router 7 safe; zero dependencies. Runs after `vite build`.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const seo = JSON.parse(readFileSync(join(root, 'src/data/seoMeta.json'), 'utf8'))
const easData = JSON.parse(readFileSync(join(root, 'src/data/eas.json'), 'utf8'))

const SITE = seo.site
const BRAND = seo.brand
const OG = `${SITE}${seo.ogPath}`

// Keep this /forex/:id template in sync with SeoManager.tsx (metaFor()).
const forexMeta = (ea) => ({
  title: `${ea.name} — ${ea.pair} MT5 Expert Advisor`,
  description: `${ea.name} (${ea.title}): ${ea.pair}, ${ea.timeframes.join(' & ')}. Verified MT5 backtest, 2021–2026, Monte Carlo.`,
})

// Full route list: static routes from seoMeta.json + one per Forex EA.
const routes = [
  ...Object.entries(seo.routes).map(([path, m]) => ({ path, ...m })),
  ...easData.eas.map((ea) => ({ path: `/forex/${ea.id}`, ...forexMeta(ea) })),
]

const escapeAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Replace the `content="…"` of every <meta> tag whose source text matches `test`. */
function setMeta(html, test, content) {
  return html.replace(/<meta\b[^>]*>/g, (tag) => {
    if (!test(tag)) return tag
    const value = `content="${escapeAttr(content)}"`
    return /content="[^"]*"/.test(tag)
      ? tag.replace(/content="[^"]*"/, value)
      : tag.replace(/\s*\/?>\s*$/, ` ${value} />`)
  })
}

function renderRoute(template, { path, title, description }) {
  const isHome = path === '/'
  const full = isHome ? title : `${title} | ${BRAND}`
  const url = isHome ? `${SITE}/` : `${SITE}${path}`

  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(full)}</title>`)
  html = setMeta(html, (t) => /name="description"/.test(t), description)
  html = setMeta(html, (t) => /property="og:title"/.test(t), full)
  html = setMeta(html, (t) => /property="og:description"/.test(t), description)
  html = setMeta(html, (t) => /property="og:url"/.test(t), url)
  html = setMeta(html, (t) => /property="og:image"/.test(t), OG)
  html = setMeta(html, (t) => /name="twitter:title"/.test(t), full)
  html = setMeta(html, (t) => /name="twitter:description"/.test(t), description)
  html = setMeta(html, (t) => /name="twitter:image"/.test(t), OG)
  html = html.replace(/<link\b[^>]*rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
  return html
}

// Content-Security-Policy — injected here (build only) so it never blocks Vite dev HMR.
// Everything is self-hosted (no CDNs/iframes). 'unsafe-inline' for script: Vite emits
// build-varying inline bootstrap + there's an inline SPA-restore snippet (hashing is brittle);
// the high-value directives are object-src/base-uri/frame-src + restricted img/font/connect/style.
// worker-src blob: covers three.js / drei-troika blob-URL workers.
// NOTE: frame-ancestors, X-Content-Type-Options and Permissions-Policy are HTTP-header-only
// (ignored in <meta>) — not enforceable on GitHub Pages. See SECURITY.md.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
].join('; ')

let template = readFileSync(join(dist, 'index.html'), 'utf8')
template = template.replace(
  '<head>',
  `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
)

if (!/<link\b[^>]*rel="canonical"/.test(template)) {
  throw new Error('prerender: index.html is missing a <link rel="canonical"> to anchor per-route URLs.')
}

let written = 0
for (const route of routes) {
  const html = renderRoute(template, route)
  const outDir = route.path === '/' ? dist : join(dist, route.path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  written++
}

// Harden the SPA fallback too — 404.html is what GitHub Pages serves for unknown deep
// links (typos, retired URLs crawlers still hit), so it should carry the same CSP.
const notFoundPath = join(dist, '404.html')
try {
  let nf = readFileSync(notFoundPath, 'utf8')
  if (!nf.includes('Content-Security-Policy')) {
    nf = nf.replace(
      '<head>',
      `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`,
    )
    writeFileSync(notFoundPath, nf)
  }
} catch {
  console.warn('prerender: dist/404.html not found — skipped CSP injection for the SPA fallback.')
}

// Regenerate the sitemap from the same route list (single source of truth) + lastmod.
const lastmod = new Date().toISOString().slice(0, 10)
const urls = routes
  .map((r) => {
    const loc = r.path === '/' ? `${SITE}/` : `${SITE}${r.path}`
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
  })
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

console.log(`prerender: wrote ${written} route HTML files + sitemap.xml (${routes.length} urls).`)

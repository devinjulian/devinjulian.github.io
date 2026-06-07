# Security Policy

The Algo Trading Center website is a **static** site (Vite + React) deployed to GitHub
Pages. It has no backend, no database, no on-site payments, and no card capture — all
purchases happen by direct contact (Telegram / email). This keeps the attack surface small.

## Reporting a vulnerability

If you find a security issue, please report it privately — do **not** open a public issue:

- Telegram: https://t.me/algo_trading_center
- Email: algotradingcenter.dev@gmail.com

Please include steps to reproduce and the affected URL/page. We aim to acknowledge reports
within a few days.

## Hardening in place

- **Content-Security-Policy** delivered via `<meta http-equiv>` (GitHub Pages can't set HTTP
  response headers). Everything is self-hosted — no third-party CDNs or iframes — so the
  policy is restrictive: `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`,
  `frame-src 'none'`, and locked-down `img`/`font`/`connect`/`style` sources. It is injected
  into the built HTML by `scripts/prerender.mjs` (kept out of the dev server so it can't block
  Vite HMR).
- **`Referrer-Policy: strict-origin-when-cross-origin`** via `<meta name="referrer">`.
- All external links use `rel="noopener noreferrer"`.
- **Dependabot** (`.github/dependabot.yml`) raises weekly PRs for npm + GitHub Actions updates.

## Known limitations of GitHub Pages

GitHub Pages serves static files only and cannot send custom HTTP response headers, so the
following **cannot** be enforced on this host (they are ignored when set via `<meta>`):

- `Content-Security-Policy: frame-ancestors` (clickjacking defense)
- `X-Content-Type-Options: nosniff`
- `Permissions-Policy`
- `Strict-Transport-Security` (GitHub Pages already serves HTTPS and HSTS-preloads
  `github.io`)

If the site moves to a host that supports response headers (or a proxy/CDN in front), these
should be added there.

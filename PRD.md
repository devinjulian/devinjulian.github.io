# PRD — Algo Trading Center Website

**Project**: ATC marketing website ("The Time Capitalist" universe)
**Owner**: Devin Julian
**Doc status**: v1.1 — ready for build in Claude Code
**Target host**: GitHub Pages (free, static)
**Last updated**: 2026-05-29 (v1.1: added the **AI Trading Agent** to the roadmap — see §8 "AI Trading Agent" block + the roadmap mentions in §7.1 and §7.4. This is roadmap *content only*; the agent is a separate system that is NOT built in this repo. **v1.2** (2026-05-29): Partner bundle no longer includes "unlimited accounts"; removed HFM from recommended IB brokers; removed Substack from the site and from this doc's links/mentions. **v1.3** (2026-05-29): MT5 backtest Max Drawdowns provided — Omnicor 53.70% (H1) / 18.67% (M30), Golden 39.47% (M30) / 44.76% (M5), Cenith PF 1.63; §11.1 resolved; per-timeframe backtest screenshots wired into the Products page.)

> **How to use this doc**: Drop it in your repo root as `PRD.md`. Claude Code reads it as the source of truth. Build in phases (see §13). Never invent performance numbers — all approved figures are in §8 and the project `.md` files.

---

## 1. Objective

Build a multi-page, immersive, scroll-driven website for Algo Trading Center that does three jobs, in this order:

1. **Establish trust** — these are real algorithms with verifiable live results, not a get-rich scheme.
2. **Tell the "Time Capitalist" story** — money is infinite, time is not; automation buys back your hours.
3. **Convert** — route a qualified visitor into a direct conversation (Telegram or email) to claim a bundle spot.

The site replaces the standalone telegra.ph pricing page as the primary destination. The telegra.ph page can stay live as a backup/canonical link, but pricing now lives natively on the site.

## 2. Success criteria

- A visitor understands the core philosophy within the first scroll.
- Every performance number on the page sits next to its risk context (drawdown, profit factor, or the Myfxbook live link) — no exceptions.
- The path from "interested" to "messaging Devin" is two clicks or fewer.
- Lighthouse: Performance ≥ 85 on mobile, Accessibility ≥ 95. The 3D must never tank these.
- Fully responsive; the 3D experience degrades gracefully on low-power devices and respects `prefers-reduced-motion`.
- Deploys to GitHub Pages with one push.

## 3. Target audience

(From project files — design copy and visuals for these three, in priority of commercial value.)

1. **Founding Members buyer** (most valuable): sophisticated trader, agency owner, mentor, or builder. Wants *ownership + ecosystem access*, not a rented bot. Speak to legacy, partnership, being "first in line."
2. **Standard buyer**: established trader with broker loyalty, willing to pay for flexibility.
3. **Partner buyer**: budget-conscious, OK with a recommended broker, wants real EAs cheaply.

Cross-cutting persona: the **tired 9-to-5 professional / veteran trader (40+)** who is exhausted by manual screen time and wants to sleep without checking the broker app at 3 AM.

Language: **English**.

## 4. Visual & UX direction

### 4.1 Concept — "The Time Capitalist"

The whole site is a journey through one idea: **Money is infinite. Your time is not.** The 3D and motion exist to *feel* that contrast, then resolve it — automation is how you stop trading your finite hours for money.

Mood: premium, calm, precise, a little cinematic. Confident — not loud. The brand voice is confrontational and philosophical, so the visuals should feel like a quiet, expensive certainty rather than a hype reel.

### 4.2 Aesthetic commitment

A **dark, void-like base** (suggesting the infinite) with **a single warm metallic accent** (time/wealth as something precious) and one cool data accent. Dominant dark + sharp gold beats a timid evenly-distributed palette.

**Proposed color tokens** (adjust to taste — define as CSS variables):

| Token | Value | Use |
|---|---|---|
| `--void` | `#0A0A0B` | Primary background (the infinite) |
| `--surface` | `#121316` | Cards, raised panels |
| `--ink` | `#F5F3EC` | Primary text on dark |
| `--muted` | `#9B978C` | Secondary text |
| `--gold` | `#E0B252` | Primary accent — time, wealth, CTA |
| `--gold-deep` | `#B5852E` | Hover / gradients |
| `--signal` | `#5BB89E` | Positive data / "growth" highlights |
| `--warn` | `#C9744B` | Drawdown / risk emphasis (honest, not alarming) |

Avoid: purple-on-white gradients, neon-on-black "crypto bro" clichés, generic SaaS pastels.

### 4.3 Typography

No Inter / Roboto / Arial / system fonts. Pair a characterful display face with a refined body and a mono for data.

- **Display** (headlines, hero): `Fraunces` (variable serif — editorial, premium, has soul). Alternative: `Clash Display`.
- **Body**: `Satoshi` (clean, modern, free via Fontshare). Alternative: `Newsreader` if you want a more literary feel.
- **Numeric / data / code**: `JetBrains Mono` — used for all backtest stats, drawdown, prices. Mono numbers read as "this is measured, not marketing."

Self-host fonts (don't rely on Google Fonts CDN at runtime) for speed and GitHub Pages reliability.

### 4.4 Motion principles

- **Smooth scroll** via `Lenis`. The page should feel like it glides.
- **Scroll-linked 3D** via `GSAP ScrollTrigger` driving the R3F camera/scene (see §5).
- **High-impact moments over scattered micro-interactions**: one orchestrated hero reveal, a few deliberate scroll beats. Staggered entrance animations on section reveal.
- `prefers-reduced-motion: reduce` → disable Lenis smoothing, freeze the 3D to a static poster frame, replace scroll-linked motion with simple fades.
- Italics for emotional emphasis, weight/size for hierarchy. **Never caps-lock** for emphasis.

## 5. The 3D experience (signature)

The 3D is concentrated on the **Home** page as a scroll narrative. Other pages are fast and content-first (a subtle ambient 3D accent is allowed but optional). This protects performance and conversion.

### 5.1 Home scroll narrative (the "time → money" arc)

A single persistent WebGL canvas behind the content, with the camera/scene driven by scroll progress:

1. **Beat 1 — The infinite.** A slow particle field / volumetric haze drifting upward. Headline resolves: *"Money is infinite."*
2. **Beat 2 — The finite.** A central object representing time — an hourglass or a slow-rotating clock/orb — with sand/light visibly depleting as you scroll. Sub-line: *"Your time is not."*
3. **Beat 3 — The machine.** Three luminous nodes orbit into view (the three EAs). The metaphor: a machine that works while you live. Transition into the product section.
4. **Beat 4 — Resolution.** Camera pulls back; the scene calms into the page background as content (products, proof, pricing) takes over.

Keep geometry lightweight (instanced particles, low-poly primitives, shader-driven effects rather than heavy meshes). No CapsuleGeometry (avoid newer Three features that break on older versions); use spheres, cylinders, planes, custom shaders.

### 5.2 Performance rules for 3D

- Lazy-load the 3D bundle; render a static poster image first, hydrate the canvas after.
- Cap device pixel ratio (`dpr={[1, 1.5]}`), pause the render loop when the canvas is offscreen.
- Detect low-power / mobile / `prefers-reduced-motion` → serve a static hero image instead of the live canvas.
- The 3D bundle must be code-split so Products/Pricing/About don't pay for it.

## 6. Information architecture

```
/                Home        — the Time Capitalist narrative + 3 EAs overview + proof + CTA
/products        Products    — the "Algorithmic Trinity" in depth (Omnicor, Cenith, Golden)
/pricing         Pricing     — 3 bundles + individual EAs + PolyBot, with the contact-to-buy flow
/about           About       — Devin's story, the "trading lab" positioning, roadmap
```

Global: sticky minimal nav (logo + Products / Pricing / About + a `Claim a Spot` button), footer with all links + risk disclaimer.

## 7. Page specs

### 7.1 Home (`/`)

Sections, top to bottom:

1. **Hero** (3D beats 1–2). Headline: *Money is infinite. Your time is not.* Sub: one line on automating wealth to buy back hours. Primary CTA: `Claim a Spot`. Secondary: `See the live results` → Myfxbook.
2. **The Reality Check** — a confrontational hook (e.g. the cost of manual screen time, the lie of the "holy grail"). Pure pain, no numbers needed here.
3. **The Algorithmic Trinity** (3D beat 3) — three EA cards: name, pair, tagline, one-line role. Cards link to `/products`. Each card shows its headline stat *with* its risk context (see §8).
4. **Proof / Trust strip** — Myfxbook live tracking link (prominent), "5-year backtest, 2021–2026," Monte Carlo method, YouTube backtest walkthroughs. This is the trust differentiator block — make it feel verifiable, not boastful.
5. **The Lab** — short positioning: ATC is a *trading lab*, an evolving ecosystem where early backers become partners. Tease the roadmap (next FX pairs, PolyBot, crypto bots, and the **AI Trading Agent** — the lab's next frontier; see the §8 AI Trading Agent block for the approved framing).
6. **Reclaim Your Time** — philosophical close (time freedom). Then the CTA section.
7. **CTA section** — `Claim a Spot` → contact flow (§9).
8. **Footer** — links + risk disclaimer (§10).

### 7.2 Products (`/products`)

Headline concept: **The Algorithmic Trinity** — three specialists, because each market has a different anatomy.

For each EA, a dedicated block (narrative subheadings, not "Product 1"):

- **Omnicor — The Wealth Compounder** (EURUSD, M30 & H1). Plug-and-play, Auto-Lot scaling. Why EURUSD / why M30 & H1. Stat block (§8).
- **Cenith — The Conservative Shield** (GBPUSD, M5). Exhaustion-filter grid, capital preservation. **Lead with the 25.79% Max DD across 5,857 trades**, then reveal the ~900%. Stat block (§8).
- **Golden — The Beast Tamer** (XAUUSD, M5 & M30, set files required). Independent Basket Trailing, thrives in NFP/FOMC chaos. Stat block (§8).

Close with "Why three" (portfolio effect — run together and the equity curve smooths) and a CTA to `/pricing`.

Each EA block: embed/link the YouTube walkthrough (§8) and the Myfxbook link, plus its **MT5 backtest screenshots** — an equity-curve + full-report pair per timeframe (Omnicor H1 & M30, Golden M30 & M5, Cenith M5). Images live in `public/backtests/`, named `<ea>-<tf>-equity.png` / `<ea>-<tf>-report.png`; the per-EA gallery auto-hides any file that's missing, so it never renders broken.

### 7.3 Pricing (`/pricing`)

The native pricing page. Sections:

1. **Early Phase Bundles** (primary offer) — three cards, real spot counters, framed by audience:
   - **Partner Bundle (IB) — $199** · spots left: 7 · 3 EAs, 10 licenses, lifetime · *requires registration under a recommended IB broker* (state this clearly — don't hide it). List the IB brokers (§8).
   - **Standard Bundle (Non-IB) — $1,999** · spots left: 9 · 3 EAs, unlimited accounts, lifetime, any broker.
   - **Founding Members Bundle — $3,999** · spots left: 8 · 3 EA source codes (.mq5, instant) + PolyBot full Python source (after Q3 2026 launch) · value $10,994, save $6,995. **Flagship — lead with ownership + ecosystem, not the discount.**
2. **Honest scarcity note** — once a bundle fills, its pricing closes permanently; counters are manually updated and real. No fake countdown timers.
3. **Individual EA pricing** table (alternative to bundles) — §8.
4. **PolyBot** — framed strictly as *in development, Q3 2026*. Standalone tiers shown as "available after launch." Early-bird waitlist optional. **No performance claims, no instant-access implication.**
5. **Contact-to-buy flow** (§9) attached to every bundle/EA CTA.
6. Risk disclaimer (§10).

Spot counts and prices should live in a single editable data file (e.g. `src/data/pricing.json`) so Devin updates one place. Treat counters as real, not decorative.

### 7.4 About (`/about`)

Devin's story + the lab positioning: the pivot from manual trading to building algorithms, "I got my evenings back," three years of building/breaking/rebuilding, the "no holy grail" honesty. Then the roadmap (next Forex pairs, PolyBot Q3 2026, crypto bots, and the **AI Trading Agent** — the lab's next frontier, see the §8 AI Trading Agent block) and the Founding Member promise (they get everything as it ships, at the original bundle price). Close philosophical + CTA.

## 8. Approved data (single source of truth)

> **Do not alter these. Do not invent additional metrics.** All performance must carry: backtest period (2021–2026), Monte Carlo method, the Myfxbook link, and — where profit is shown — its risk context.

**Omnicor EA** — EURUSD · M30 & H1 · "The Wealth Compounder" · no set files (plug-and-play) · MT4/MT5 · Auto-Lot scaling
- 5-yr backtest (2021–2026), Monte Carlo. **H1, aggressive params**: $100k → $12.3M+ · ~12,000% total return · Profit Factor 3.65 · Win Rate ~78% · **Max Drawdown 53.70%** · 5,798 trades
- Second config — **M30**: start $10,000 · Net Profit $114,712.45 (~1,147%) · Profit Factor 1.86 · Max Drawdown 18.67% · 9,887 trades
- **Compliance**: the 12,000% figure must ALWAYS appear with: "5-year compounding, aggressive parameters, backtest conditions" + its **53.70% Max DD** + Myfxbook link.
- Walkthrough: https://youtu.be/yfcjlakkXHg

**Cenith EA** — GBPUSD · M5 (strict default) · "The Conservative Shield" · no set files · MT4/MT5 · exhaustion-filter adaptive grid
- 5-yr backtest (2021–2026), Monte Carlo. **M5**: start $10,000 · Net Profit $91,194.45 (~900%) · **Max Drawdown 25.79%** · Profit Factor 1.63 · 5,857 trades
- **Compliance**: lead with the 25.79% Max DD / 5,857 trades, then the ~900%.
- Walkthrough: https://youtu.be/189AvDW_-nE

**Golden EA** — XAUUSD · M5 & M30 · "The Beast Tamer" · **set files required (2, one per TF)** · MT4/MT5 · Independent Basket Trailing
- 5-yr backtest (2021–2026), Monte Carlo. **M30**: start $10,000 · Net Profit $91,172.64 (~911%) · Profit Factor 1.87 · **Max Drawdown 39.47%** · 1,878 trades
- Second config — **M5**: start $10,000 · Net Profit $223,658.80 (~2,237%) · Profit Factor 1.27 · Max Drawdown 44.76% · 1,627 trades
- **Compliance**: pair return with Profit Factor + the context line (institutional Gold strategies sit ~1.3–1.5) + its **Max DD** + Myfxbook.
- Walkthrough: https://youtu.be/I_6VeeVDyPQ

**Individual EA pricing**

| EA | Pair | Partner (IB) | Any Broker | Source Code (.mq5) |
|---|---|---|---|---|
| Omnicor | EURUSD | $99 (2 licenses) | $999 (2 licenses) | $1,999 |
| Cenith | GBPUSD | $99 (1 license) | $999 (1 license) | $1,999 |
| Golden | XAUUSD | $99 (2 licenses) | $999 (2 licenses) | $1,999 |

**PolyBot** (in development, launch Q3 2026 — no performance claims)
- Standalone (after launch): Starter $497 (1 wallet) · Pro $997 (3) · Elite $1,997 (unlimited)
- Early-bird waitlist (first 30): Starter $297 · Pro $597 · Elite $1,297
- Required note wherever mentioned: *PolyBot is currently in development. No performance claims are made. Founding Members receive the Python source code after the Q3 2026 launch.*

**AI Trading Agent** (the lab's next frontier — in active research & design, after PolyBot — NO performance claims)

The next-generation project. Where the three EAs and PolyBot follow fixed rules, this is the lab teaching its systems to *read the context* that rule-based bots are blind to. Present it as a vision, not a product you can buy today.

- **What it is** (visitor-facing): an AI research desk that studies the market each session the way a hedge-fund team would — a panel of specialist analysts (technical, quantitative, macro, market strategy, and risk) whose findings are weighed into a single high-conviction view: buy, sell, or stand aside. It does the morning analysis a serious desk does, every session, before the market opens.
- **Why it's different** (the trust angle): it reasons over real, computed market data — not vibes; a hard risk gate sits *after* the AI, so a wrong call still can't blow the account; and a human reviews every signal before anything is ever automated. It is decision-support, not a "money machine."
- **Where it sits in the lineup**: the evolution beyond the Algorithmic Trinity and PolyBot — the same lab, the same transparency standard (drawdown shown, results verified), pointed at a harder problem.
- **Founding Members positioning**: "first in line when it ships," terms confirmed closer to launch. Do **NOT** state it is a guaranteed inclusion in the Founding Members Bundle yet — that is decided closer to launch.
- **Status framing (always)**: "in active research and design." Never imply it exists, works, or is purchasable now. No pricing on the site yet (commercial model is undecided).
- **FORBIDDEN for this product**: any performance number or projection; "predicts the market" (it forms a *probabilistic view*, it does not predict price); "guaranteed" / "risk-free" / "autonomous money machine" / "set-and-forget profits"; fabricated signals, screenshots, or testimonials.
- **Required note wherever mentioned**: *The AI Trading Agent is in active development. No performance claims are made. It is research and decision-support, not financial advice; trading involves substantial risk of loss. Founding Members will be first in line when it ships.*

**Recommended IB brokers** (for Partner plans)
- RoboForex: https://my.roboforex.com/en/?a=nghxz
- Exness: https://one.exnessonelink.com/a/tqn9e1yaat
- Tickmill: https://my.tickmill.com/en/sign-up (IB76549515)

**Links**
- Myfxbook (live tracking): https://www.myfxbook.com/members/atc1111
- Telegram channel: https://t.me/algo_trading_center
- Email: algotradingcenter.dev@gmail.com
- Backup pricing page: https://telegra.ph/ALGO-TRADING-CENTER---OFFICIAL-EA-PRICING-04-05

## 9. Contact-to-buy flow (the "2 ways")

Payments are handled by **direct contact**, not an on-site checkout. (No payment form, no card capture — this keeps the site static-friendly and safe.)

When a visitor clicks any `Claim a Spot` / bundle CTA, open a contact panel (modal or anchored section) offering **two paths**:

1. **Telegram** → deep link to https://t.me/algo_trading_center, ideally with a pre-filled message naming the chosen bundle, e.g. `Hi, I want the Founding Members Bundle`.
2. **Email** → `mailto:algotradingcenter.dev@gmail.com` with a pre-filled subject/body naming the chosen bundle.

> **Assumption to confirm**: the "2 ways to contact" = **Telegram + Email** (the two channels in your project files). If you meant something else (e.g. a WhatsApp number, or a form that emails you), tell me and I'll revise §9.

The CTA should carry context: which bundle/EA the user was viewing should pre-populate the message so you know what they want before they say a word.

## 10. Compliance & trust (non-negotiable)

Bake these into the build as hard rules:

- **Drawdown / risk context next to every profit figure.** Cenith → Max DD 25.79%. Omnicor & Golden → Profit Factor + honest-framing note + Myfxbook until a Max DD is provided (§11).
- **Backtest period (2021–2026) and Monte Carlo method** shown wherever returns appear.
- **Myfxbook live link** present on Home, Products, and anywhere numbers are quoted.
- **Risk disclaimer** in the footer (site-wide) and on Pricing/Products:
  > *Past performance does not guarantee future results. Trading involves substantial risk of loss. Results shown are from backtests on historical data; live results will vary based on broker conditions, spread, slippage, and chosen parameters.*
- **PolyBot disclaimer** (§8) wherever PolyBot appears.
- **Banned language** — never: "guaranteed," "no loss," "risk-free," specific forward return promises ("X% per month"), fake testimonials/invented user names. No emoji spam, no caps-lock emphasis.
- **Scarcity is real** — show actual spot counts; no fake countdown timers, no inflated "value."

## 11. Open items / assets needed from Devin

1. ~~**Omnicor & Golden Max Drawdown** (backtest %).~~ **Resolved (v1.3):** provided via MT5 backtests — Omnicor 53.70% (H1) / 18.67% (M30); Golden 39.47% (M30) / 44.76% (M5). Now shown next to each return.
2. **Logo + any brand marks** (SVG preferred). If none exist, I'll set a clean wordmark in the display font.
3. **Myfxbook screenshot/equity-curve image** for the trust strip (optional but high-impact above the fold).
4. **Domain choice**: `username.github.io`, a project subpath, or a custom domain (e.g. algotradingcenter.com)? Affects the Vite `base` config.
5. **Confirm the "2 ways" contact channels** (§9).
6. **About-page personal story**: confirm the current adapted copy reads accurately, or supply fresh details.
7. **3D fidelity preference**: full cinematic (heavier) vs. tasteful-and-fast (lighter). Default = tasteful-and-fast.

## 12. Tech stack (for Claude Code + free GitHub Pages)

**Primary recommendation** — static SPA, deploys clean to Pages, handles 3D well:

- **Build**: Vite + React + TypeScript
- **Routing**: React Router (configure for GitHub Pages — hash router or a 404.html SPA fallback for deep links)
- **Styling**: Tailwind CSS, with the §4.2 tokens as CSS variables
- **3D**: `three` + `@react-three/fiber` + `@react-three/drei` (code-split, lazy-loaded)
- **Motion / scroll**: `lenis` (smooth scroll) + `gsap` ScrollTrigger; `motion` (Framer Motion) for component reveals
- **Fonts**: self-hosted Fraunces / Satoshi / JetBrains Mono
- **Data**: `src/data/pricing.json` and `src/data/eas.json` as single sources of truth (mirror §8)

**Alternative** (if you want max page speed): **Astro** for static multi-page + **React islands** only where 3D/interactivity lives. More setup, faster pages. Pick this only if you're comfortable with the islands model.

**Suggested structure**
```
/public            (favicon, og.png, fonts, backtests/ screenshots)
/src
  /components      (Nav, Footer, EACard, StatBlock, BundleCard, ContactPanel, Disclaimer)
  /scenes          (R3F: Hero3D, scroll-driven scene + shaders)
  /pages           (Home, Products, Pricing, About)
  /data            (eas.json, pricing.json, brokers.json)
  /styles          (tokens.css, globals.css)
  main.tsx, App.tsx
.github/workflows/deploy.yml   (Pages deploy)
vite.config.ts                 (set `base` per §11.4)
```

## 13. Build plan (phased — for Claude Code)

1. **Phase 0 — Scaffold & deploy pipeline.** Vite + React + TS + Tailwind. Tokens + fonts. A "hello" Home page. GitHub Actions workflow deploying to Pages. **Confirm the live URL works before building further.**
2. **Phase 1 — Static content, no 3D.** All four pages with real copy and data from §8, responsive, accessible, compliant (disclaimers, drawdown rules, Myfxbook). Contact flow (§9) functional. This alone is a shippable, conversion-ready site.
3. **Phase 2 — Motion layer.** Lenis smooth scroll + Framer Motion section reveals + `prefers-reduced-motion` fallbacks.
4. **Phase 3 — 3D hero & scroll narrative.** R3F canvas, the time→money beats, code-split + lazy-loaded + poster fallback + low-power detection. Re-check Lighthouse.
5. **Phase 4 — Polish.** Micro-interactions, OG/meta tags, favicon, 404, final Lighthouse + accessibility pass.

Ship Phase 1 even if 3D isn't done — a fast, honest, converting site beats a half-finished cinematic one.

## 14. Out of scope (v1)

- On-site payments / checkout (handled via contact — §9).
- User accounts, license dashboards, gated content.
- Blog/CMS (out of scope for v1 — no on-site blog).
- Backend / database (site is fully static).

---

*Risk note for any published marketing derived from this site: Past performance does not guarantee future results. Trading involves substantial risk of loss.*

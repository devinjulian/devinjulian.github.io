# Algo Trading Center — Website

Marketing site for ATC ("The Time Capitalist"). Immersive 3D scroll, multi-page, static, deployed to GitHub Pages.

**Read `@PRD.md` for the full spec.** Build in the phases defined there (Phase 0 → 4). Ship Phase 1 (fast, static, compliant) even if the 3D isn't finished.

## Stack
Vite + React + TypeScript + Tailwind. 3D: `three` + `@react-three/fiber` + `@react-three/drei` (code-split, lazy-loaded). Motion: `lenis` + `gsap` ScrollTrigger + `motion` (Framer Motion). Self-hosted fonts (Fraunces / Satoshi / JetBrains Mono). Single sources of truth: `src/data/eas.json`, `src/data/pricing.json`.

## Deploy
GitHub Pages via `.github/workflows/deploy.yml`. Set Vite `base` to match the domain (ask before assuming — see PRD §11). Use a 404.html SPA fallback or hash router so deep links work on Pages.

## Hard rules — never break (compliance)
- **Every profit/return number must show its risk context** in the same view: drawdown %, profit factor, or the Myfxbook link. No naked profit numbers.
- **Show the backtest period (2021–2026) and Monte Carlo method** wherever returns appear.
- **Never invent performance numbers.** Only use the approved figures in `@PRD.md` §8. If a number isn't there, leave it out and ask.
- **Banned words anywhere on the site**: "guaranteed", "no loss", "risk-free", and specific forward promises like "X% per month".
- **PolyBot is always "in development, launches Q3 2026"** — never imply instant access, never make performance claims. Show its required disclaimer wherever it appears.
- **AI Trading Agent is roadmap-only** — always "in active research and design," the lab's next frontier after PolyBot. Never imply it exists, works, or is purchasable; no pricing for it on the site. Banned for it specifically: "predicts the market", "autonomous money machine", any performance number. Founding Members are "first in line" — NOT a guaranteed bundle inclusion. Framing + disclaimer in `@PRD.md` §8 (AI Trading Agent block).
- **Site-wide risk disclaimer in the footer** (exact text in PRD §10).
- **Scarcity is real** — show actual spot counts; no fake countdown timers, no inflated "value" claims.
- **No on-site payments / card capture.** Purchase = direct contact (Telegram + email), pre-filled with the chosen bundle. See PRD §9.

## Brand voice (this is a marketing site — copy matters)
- Tone: confrontational hook, philosophical framing, technical depth. Confident and calm, not hype.
- Narrative subheadings ("The Reality Check", "The Beast Tamer") — never generic ("Introduction", "Features").
- Italics for emotional emphasis, bold for product names / technical terms. **Never caps-lock for emphasis.**
- No emoji spam. Em dashes used sparingly. Avoid rule-of-three patterns.
- Banned AI-tell phrases: "in today's fast-paced world", "in the realm of", "delve into", "navigate the complexities", "it's important to note", "leverage" (as a verb).
- No fake testimonials or invented user names.

## Pending data — do NOT fabricate
- **Omnicor & Golden Max Drawdown** are not yet provided. Until Devin supplies them, pair those returns with Profit Factor + the honest-framing note + the Myfxbook link. Do not show a made-up drawdown.
- Cenith Max DD (25.79%) is confirmed — use it.

## Where the truth lives
- All approved performance numbers, pricing, links, and broker list: `@PRD.md` §8 (mirror them into `src/data/*.json`).
- If something conflicts, PRD §8 wins. If something is missing, ask Devin — don't guess.

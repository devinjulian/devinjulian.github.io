import easData from './eas.json'
import pricingData from './pricing.json'
import brokersData from './brokers.json'
import linksData from './links.json'
import seoMeta from './seoMeta.json'
import type { BacktestMeta, EA, ForexTier, Broker, Links, Subscription } from './types'

// Canonical site identity — single source of truth (shared with scripts/prerender.mjs).
export const SITE = seoMeta.site
export const BRAND = seoMeta.brand
export const OG = `${SITE}${seoMeta.ogPath}`

export const backtest = easData.backtest as BacktestMeta
export const eas = easData.eas as unknown as EA[]

export const forexTiers = pricingData.forexTiers as ForexTier[]
export const subscription = pricingData.subscription as Subscription

export const brokers = brokersData as Broker[]
export const links = linksData as Links

/** Site-wide risk disclaimer — exact text from PRD §10. Do not soften. */
export const RISK_DISCLAIMER =
  'Past performance does not guarantee future results. Trading involves substantial risk of loss. Results shown are from backtests on historical data; live results will vary based on broker conditions, spread, slippage, and chosen parameters.'


/** Required wherever the AI Trading Agent / Crypto Futures Signals appear (PRD §8). */
export const AI_AGENT_DISCLAIMER =
  'The AI Trading Agent issues decision-support signals — not financial advice. You place every trade yourself on your own account; nothing is executed for you. Results are published as R-multiples with the risk (stop-loss and target) always shown, and reflect a young public track record; past performance does not guarantee future results, and crypto trading carries a substantial risk of loss. Live signals are available by paid subscription; the public results log is free.'

export const getEA = (id: string): EA | undefined => eas.find((e) => e.id === id)

export * from './types'

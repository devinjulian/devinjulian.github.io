import easData from './eas.json'
import pricingData from './pricing.json'
import brokersData from './brokers.json'
import linksData from './links.json'
import seoMeta from './seoMeta.json'
import type {
  BacktestMeta,
  EA,
  Bundle,
  IndividualEAPrice,
  PolyBot,
  Broker,
  Links,
} from './types'

// Canonical site identity — single source of truth (shared with scripts/prerender.mjs).
export const SITE = seoMeta.site
export const BRAND = seoMeta.brand
export const OG = `${SITE}${seoMeta.ogPath}`

export const backtest = easData.backtest as BacktestMeta
export const eas = easData.eas as unknown as EA[]

export const bundles = pricingData.bundles as unknown as Bundle[]
export const individualEAs = pricingData.individualEAs as IndividualEAPrice[]
export const polybot = pricingData.polybot as PolyBot
export const scarcityNote = pricingData.scarcityNote

export const brokers = brokersData as Broker[]
export const links = linksData as Links

/** Site-wide risk disclaimer — exact text from PRD §10. Do not soften. */
export const RISK_DISCLAIMER =
  'Past performance does not guarantee future results. Trading involves substantial risk of loss. Results shown are from backtests on historical data; live results will vary based on broker conditions, spread, slippage, and chosen parameters.'

/** Required wherever PolyBot appears (PRD §8/§10). */
export const POLYBOT_DISCLAIMER = polybot.disclaimer

/** Required wherever the AI Trading Agent is mentioned — testing-phase framing (PRD §8). */
export const AI_AGENT_DISCLAIMER =
  'The AI Trading Agent is in a manual, human-reviewed testing phase — every signal is checked by a person and nothing is automated. The results shown are from this forward test and are an early, limited sample; past performance does not guarantee future results, and crypto trading carries a substantial risk of loss. It is decision-support, not financial advice. The Agent is not for sale yet — Founding Members will be first in line.'

export const getEA = (id: string): EA | undefined => eas.find((e) => e.id === id)

export * from './types'

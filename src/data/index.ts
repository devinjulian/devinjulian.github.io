import easData from './eas.json'
import pricingData from './pricing.json'
import brokersData from './brokers.json'
import linksData from './links.json'
import type {
  BacktestMeta,
  EA,
  Bundle,
  IndividualEAPrice,
  PolyBot,
  Broker,
  Links,
} from './types'

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

/** Required wherever the AI Trading Agent is mentioned — exact PRD §8 text. Roadmap-only. */
export const AI_AGENT_DISCLAIMER =
  'The AI Trading Agent is in active development. No performance claims are made. It is research and decision-support, not financial advice; trading involves substantial risk of loss. Founding Members will be first in line when it ships.'

export const getEA = (id: string): EA | undefined => eas.find((e) => e.id === id)

export * from './types'

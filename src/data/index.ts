import easData from './eas.json'
import pricingData from './pricing.json'
import brokersData from './brokers.json'
import linksData from './links.json'
import seoMeta from './seoMeta.json'
import type {
  BacktestMeta,
  EA,
  EAPlan,
  Billing,
  Onboarding,
  Capital,
  Membership,
  Broker,
  Links,
  MembershipLadder,
} from './types'

// Canonical site identity — single source of truth (shared with scripts/prerender.mjs).
export const SITE = seoMeta.site
export const BRAND = seoMeta.brand
export const OG = `${SITE}${seoMeta.ogPath}`

export const backtest = easData.backtest as BacktestMeta
export const eas = easData.eas as unknown as EA[]

export const eaPlans = pricingData.eaPlans as EAPlan[]
export const billing = pricingData.billing as Billing
export const onboarding = pricingData.onboarding as Onboarding
export const capital = pricingData.capital as Capital
export const membership = pricingData.membership as Membership
export const membershipLadder = pricingData.membershipLadder as MembershipLadder

export const brokers = brokersData as Broker[]
export const links = linksData as Links

/** Site-wide risk disclaimer — exact text from PRD §10. Do not soften. */
export const RISK_DISCLAIMER =
  'Past performance does not guarantee future results. Trading involves substantial risk of loss. Results shown are from backtests on historical data; live results will vary based on broker conditions, spread, slippage, and chosen parameters.'

export const getEA = (id: string): EA | undefined => eas.find((e) => e.id === id)

export * from './types'

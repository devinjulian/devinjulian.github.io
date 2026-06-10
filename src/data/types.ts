export interface BacktestMeta {
  period: string
  periodLabel: string
  method: string
  methodLabel: string
}

export interface EAMetrics {
  return?: string
  growth?: string
  netProfit?: string
  startingBalance?: string
  profitFactor?: string | null
  winRate?: string | null
  maxDrawdown?: string | null
  trades?: string | null
  params?: string | null
}

export interface Backtest {
  /** Timeframe label, e.g. "H1", "M30", "M5". */
  tf: string
  note: string
  /** Equity-curve screenshot. */
  equity: string
  /** Full MT5 report screenshot (opened on click). */
  report: string
}

export interface EA {
  id: string
  name: string
  title: string
  pair: string
  timeframes: string[]
  platforms: string[]
  setFiles: boolean
  setFilesNote: string
  mechanism: string
  tagline: string
  order: number
  metrics: EAMetrics
  /** When false, the UI must pair returns with Profit Factor + framingNote + Myfxbook (PRD §10/§11). */
  maxDrawdownKnown: boolean
  /** Cenith leads with its drawdown (capital-preservation framing, PRD §8); others lead with return. */
  leadWithDrawdown?: boolean
  riskContext: string
  framingNote: string | null
  walkthrough: string
  backtests?: Backtest[]
}

export interface Bundle {
  id: string
  name: string
  subtitle: string
  price: number
  priceLabel: string
  spotsLeft: number
  audience: string
  features: string[]
  requiresIB: boolean
  ibNote: string | null
  value?: number
  valueLabel?: string
  save?: number
  saveLabel?: string
  flagship: boolean
  order: number
}

export interface IndividualEAPrice {
  ea: string
  pair: string
  partnerIB: string
  partnerLicenses: string
  anyBroker: string
  anyBrokerLicenses: string
  sourceCode: string
}

export interface Subscription {
  monthly: string
  monthlyAmount: number
  yearly: string
  yearlyAmount: number
  yearlyNote: string
  allAccessNote: string
  channel: string
  payment: string
}

export interface Broker {
  name: string
  url: string
  note: string | null
}

export interface Links {
  myfxbook: string
  telegram: string
  telegramHandle: string
  email: string
  backupPricing: string
}

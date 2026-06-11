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

/** One way to own the three-EA bundle (every tier includes all three EAs — PRD §8). */
export interface ForexTier {
  id: string
  name: string
  price: string
  priceAmount: number
  tagline: string
  features: string[]
  requiresIB: boolean
  ibNote: string | null
  order: number
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

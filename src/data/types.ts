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
  /** What the monthly subscription includes, shown as bullets under the price. */
  features: string[]
  /** Grandfathered-price promise. Scoped to signals only — never extend it to the BOT. */
  foundingNote: string
  allAccessNote: string
  channel: string
  payment: string
}

/** One rung of the Exclusive Membership slot ladder (PRD §14.1). `slotsLeft` is
 *  maintained by hand and must always be true — a stale count is worse than none. */
export interface MembershipStage {
  price: string
  priceAmount: number
  slots: number
  slotsLeft: number
  state: 'open' | 'upcoming' | 'soldOut'
}

export interface MembershipLadder {
  note: string
  /** When true, the tier closes permanently once the final stage sells out. */
  closesAfterFinal: boolean
  stages: MembershipStage[]
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

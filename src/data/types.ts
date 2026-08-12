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

/** One monthly plan for the three-EA bundle. Every plan carries all three EAs — the
 *  only difference is the broker requirement and the rate (PRD §8). */
export interface EAPlan {
  id: string
  name: string
  /** Monthly rate. Kept on an exact Telegram Stars bundle amount so a member never
   *  has to overbuy Stars — see PRD §8.2. */
  price: string
  priceAmount: number
  tagline: string
  features: string[]
  requiresIB: boolean
  ibNote: string | null
  order: number
}

/** What happens between paying and trading. Stated because a site with no checkout
 *  asks the buyer to transfer funds to a stranger with no idea what follows. */
export interface Onboarding {
  headline: string
  steps: { k: string; v: string }[]
  note: string
  setup: string
}

export interface Billing {
  period: string
  note: string
  payment: string
}

/** What a member needs behind the EA. The cent-account route is the low-risk way in —
 *  same EAs, same strategy, one-hundredth of the scale. */
export interface Capital {
  standard: string
  standardNote: string
  centLabel: string
  centNote: string
  brokerNote: string
}

/** The one-time alternative to subscribing: source code, owned outright.
 *  `features` is the short list for the card on /forex; `benefits` and `notIncluded`
 *  are the long form used on the dedicated /membership page. */
export interface Membership {
  id: string
  name: string
  price: string
  priceAmount: number
  tagline: string
  features: string[]
  benefits: { k: string; v: string }[]
  /** Stated plainly — at this price the buyer's real question is what this is *not*. */
  notIncluded: string[]
}

/** One rung of the Exclusive Membership slot ladder (PRD §14.1). `slotsLeft` is
 *  maintained by hand and must always be true — a stale count is worse than none. */
export interface MembershipStage {
  price: string
  priceAmount: number
  /** null on the final rung — that price is permanent and uncapped, not a batch. */
  slots: number | null
  slotsLeft: number | null
  state: 'open' | 'upcoming' | 'soldOut'
  final: boolean
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

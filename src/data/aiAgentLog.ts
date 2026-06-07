// Single source of truth for the AI Trading Agent manual-testing log.
// COMPLIANCE: real, owner-provided data only — never fabricate. Results are R-multiples
// (reward vs. the risk taken), never $ or % profit. Each session is one calendar day and
// may hold zero, one, or many signals (the Agent's daily report can flag several).

export type SignalOutcome = 'profit' | 'stoploss'

export interface AiSignal {
  asset: string // e.g. 'DOGE/USDT'
  direction: 'Long' | 'Short'
  entry: string
  stopLoss: string
  takeProfit: string // may list multiple targets, e.g. 'TP1 0.0988 · TP2 0.0972'
  leverage?: string // e.g. '3x'
  result: string // R-multiple text, e.g. 'Hit TP2 (+2.3R)'
  outcome: SignalOutcome
  reason: string // why the Agent took it
}

export interface AiAgentSession {
  date: string // ISO 'YYYY-MM-DD' — one report per day
  marketInsight: string // concise read of the session (typewriter in the modal); for a
  // no-signal day this explains why the Agent stood aside
  signals: AiSignal[] // empty array = no-signal day
}

/** True only while the table shows illustrative placeholders. Real data → false. */
export const AI_AGENT_SAMPLE = false

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const aiAgentLog: AiAgentSession[] = [
  {
    date: '2026-06-01',
    marketInsight:
      'The entire top 10 was bleeding while the crowd stayed heavily long — BTC 63% long, ETH 77%, SOL 79%. With everyone leaning one way and price still dropping, the path of least resistance was short into the flush. Only two assets cleared every filter at full confidence.',
    signals: [
      {
        asset: 'DOGE/USDT',
        direction: 'Short',
        entry: '0.1002',
        stopLoss: '0.1015',
        takeProfit: 'TP1 0.0988 · TP2 0.0972',
        leverage: '3x',
        result: 'Hit TP2 (+2.3R)',
        outcome: 'profit',
        reason:
          'Bearish Engulfing + Marubozu at the hourly close, RSI 43 and sinking. Funding positive with 73% of Binance accounts long — a trapped crowd.',
      },
      {
        asset: 'ADA/USDT',
        direction: 'Short',
        entry: '0.2315',
        stopLoss: '0.2340',
        takeProfit: 'TP1 0.2290 · TP2 0.2260',
        leverage: '3x',
        result: 'Hit TP2 (+2.2R)',
        outcome: 'profit',
        reason:
          'Evening Star at the last hourly candle, RSI 40 — the weakest in the top 10. Price rejected below all EMAs; the cleanest bearish reversal on the list.',
      },
    ],
  },
  {
    date: '2026-06-02',
    marketInsight:
      'Full risk-off: Fear & Greed at 22 (Extreme Fear), the market down 2.85% on the day, with Three Black Crows printing on BTC, ADA and across the alts. Every bullish reversal candle was invalidated by fresh selling, so nothing cleared the confidence bar. The honest call was no trade — forcing a setup where none exists is how accounts bleed.',
    signals: [],
  },
  {
    date: '2026-06-03',
    marketInsight:
      'Full meltdown — Fear & Greed at 12, lower than FTX-collapse territory, BTC cracking under $66K. Every top-10 coin is oversold, yet the crowd is still heavily long (BTC 69%, ETH 74%, SOL 79%) with no bullish structure break — a liquidity trap that likely needs one more flush. No setup cleared the confidence bar, so the Agent stayed on the sidelines until BTC stabilises.',
    signals: [],
  },
  {
    date: '2026-06-04',
    marketInsight:
      'The top-10 megacaps sat in a no-trade chop zone — extreme fear, no clean structure — so none qualified for an M1 scalp. The only momentum watch was WLD on a pullback toward 0.585, but with no confident top-10 setup, no entry was taken.',
    signals: [],
  },
  {
    date: '2026-06-05',
    marketInsight:
      'Plenty of deeply oversold setups — ADA RSI 18, SOL 20, BTC 28, ETH at the lower band — but every one topped out at confidence 9, just under the Agent’s 10/10 entry bar, with bearish structure still overhead. Discipline over FOMO: all skipped, no entry taken.',
    signals: [],
  },
]

const ymOf = (date: string): { year: number; month: number } => {
  const [y, m] = date.split('-').map(Number)
  return { year: y, month: m }
}

/** Years that have at least one session, newest first. */
export function availableYears(): number[] {
  return [...new Set(aiAgentLog.map((s) => ymOf(s.date).year))].sort((a, b) => b - a)
}

/** Months (1-12) that have sessions in a given year, ascending. */
export function monthsForYear(year: number): number[] {
  return [
    ...new Set(aiAgentLog.filter((s) => ymOf(s.date).year === year).map((s) => ymOf(s.date).month)),
  ].sort((a, b) => a - b)
}

/** Sessions for a year+month, sorted by date ascending. */
export function entriesFor(year: number, month: number): AiAgentSession[] {
  return aiAgentLog
    .filter((s) => {
      const k = ymOf(s.date)
      return k.year === year && k.month === month
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Signal/day counts for a year+month (honest tally — no $/%). */
export function tallyFor(
  year: number,
  month: number,
): { profit: number; stoploss: number; noSignalDays: number } {
  let profit = 0
  let stoploss = 0
  let noSignalDays = 0
  for (const session of entriesFor(year, month)) {
    if (session.signals.length === 0) {
      noSignalDays += 1
      continue
    }
    for (const sig of session.signals) {
      if (sig.outcome === 'profit') profit += 1
      else stoploss += 1
    }
  }
  return { profit, stoploss, noSignalDays }
}

/** Most recent period present in the log (falls back to today if empty). */
export function latestPeriod(): { year: number; month: number } {
  if (aiAgentLog.length === 0) {
    const n = new Date()
    return { year: n.getFullYear(), month: n.getMonth() + 1 }
  }
  const latest = aiAgentLog.reduce((a, b) => (a.date > b.date ? a : b))
  return ymOf(latest.date)
}

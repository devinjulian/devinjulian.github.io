// Single source of truth for the AI Trading Agent manual-testing log.
// COMPLIANCE: real, owner-provided data only — never fabricate. Results are R-multiples
// (reward vs. the risk taken), never $ or % profit. Each session is one calendar day and
// may hold zero, one, or many signals (the Agent's daily report can flag several).
// CHART PROOF: `chart` is an optional CHART screenshot (price action + SL/TP levels) —
// NEVER an account/PnL screenshot showing $ or % balance. Self-host it under public/ai-agent/
// (CSP is img-src 'self'; external/hotlinked images are blocked in production).

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
  chart?: string // optional chart screenshot, e.g. '/ai-agent/2026-06-01-doge.jpg' — CHART ONLY, no $/% PnL
  chartAlt?: string // accessible description of the chart
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
        chart: '/ai-agent/2026-06-01-doge.jpg',
        chartAlt:
          'DOGE/USDT 15m chart — short from 0.1002 with stop above 0.1015; price sells off through the target zone to ~0.0972.',
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
        chart: '/ai-agent/2026-06-01-ada.jpg',
        chartAlt:
          'ADA/USDT 15m chart — short from 0.2315 with stop above 0.2340; price rejects lower through the target zone to ~0.2260.',
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
  {
    date: '2026-06-08',
    marketInsight:
      'No high-impact news on a quiet weekend — clean conditions for scalping. A full scan across BTC, ETH and SOL, the trending coins, funding, open interest and long/short ratios surfaced three setups that cleared the full-confidence bar, all long. Two more names — BEAT and HYPE — were flagged watch-only: strong narratives but too extended (BEAT’s RSI at 90) to chase here.',
    signals: [
      {
        asset: 'ALLO/USDT',
        direction: 'Long',
        entry: '0.420',
        stopLoss: '0.380',
        takeProfit: '0.485',
        leverage: '2x',
        result: 'Hit TP (+1.6R)',
        outcome: 'profit',
        reason:
          'Allora up ~62% in 24h on $335M volume — extreme for a rank-#237 coin. Three White Soldiers plus a Bullish Engulfing confirmed on the hourly, RSI 73 still rising and the MACD histogram positive. Entered on the retest of new support before continuation.',
        chart: '/ai-agent/2026-06-08-allo.jpg',
        chartAlt:
          'ALLO/USDT 15m chart — long from 0.420 with stop at 0.380; price pushes up into the 0.485 target zone, then fades.',
      },
      {
        asset: 'ZEC/USDT',
        direction: 'Long',
        entry: '420.00',
        stopLoss: '406.00',
        takeProfit: '440.00',
        leverage: '2x',
        result: 'Hit TP (+1.1R)',
        outcome: 'profit',
        reason:
          'Zcash turning over $1B in 24h as the privacy-coin wave heated up. A Bullish Engulfing after the prior day’s Three Black Crows — a strong reversal — with the Binance long/short ratio at just 0.74 (58% of traders short): a contrarian setup with squeeze potential, RSI 51 leaving room to run.',
        chart: '/ai-agent/2026-06-08-zec.jpg',
        chartAlt:
          'ZEC/USDT 15m chart — long from 420 with stop at 406; price dips toward 415, holds above the stop, then rallies through the 440 target to ~455.',
      },
      {
        asset: 'ETH/USDT',
        direction: 'Long',
        entry: '1,660',
        stopLoss: '1,637',
        takeProfit: '1,700',
        leverage: '3x',
        result: 'Hit TP (+1.1R)',
        outcome: 'profit',
        reason:
          'ETH up 3.33% on $9.9B volume — clear bullish momentum, outperforming BTC, with funding mildly positive. MA-5 above MA-21 confirmed the structure; entered on the MA-21 hourly retest toward the 1,700 psychological resistance.',
        chart: '/ai-agent/2026-06-08-eth.jpg',
        chartAlt:
          'ETH/USDT 15m chart — long from 1,660 with stop at 1,637; price rallies and tags the 1,700 target before pulling back.',
      },
    ],
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

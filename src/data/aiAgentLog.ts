// Single source of truth for the AI Trading Agent public results log.
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
  // no-signal / no-trade day this explains why the Agent stood aside
  signals: AiSignal[] // empty array = no-signal day
  // True when the Agent deliberately stood down for the day because of high-impact
  // news (NOT its own no-setup judgement). Always paired with signals: [] — these
  // days have NO outcome and must never be counted as profit/stop. The calendar
  // tints them distinctly and labels them "No trade"; `marketInsight` carries the news.
  newsHold?: boolean
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
  {
    date: '2026-06-09',
    marketInsight:
      'No high-impact news on the calendar and a clear macro slate — clean conditions to trade. The scan surfaced two full-confidence setups on opposite sides: a HYPE short into a failed breakout, and an ETH long into a tested demand zone. Two more names were noted watch-only — ZEC on the spot side and a Base-ecosystem rotation (CTR after AERO) — not full setups, so they were left off the ticket.',
    signals: [
      {
        asset: 'HYPE/USDT',
        direction: 'Short',
        entry: '59.143',
        stopLoss: '61.281',
        takeProfit: 'TP1 57.200',
        leverage: '3x',
        result: 'Hit TP1 (+0.9R)',
        outcome: 'profit',
        reason:
          'HYPE down ~9% on the day — from a 64.63 high to 58.78 — after a failed breakout at the 64 zone and losing the 75.48 ATH area. Sell volume dominant; M1 structure firmly bearish, and the breakdown under 60 opened the path toward 57. Tight stop above the swing high.',
        chart: '/ai-agent/2026-06-09-hype.jpg',
        chartAlt:
          'HYPE/USDT 15m chart — short from 59.143 with stop above 61.281; price breaks down through the 57.200 target zone to ~57.0.',
      },
      {
        asset: 'ETH/USDT',
        direction: 'Long',
        entry: '1,628',
        stopLoss: '1,606',
        takeProfit: 'TP1 1,650',
        leverage: '2x',
        result: 'Hit TP1 (+1.0R)',
        outcome: 'profit',
        reason:
          'ETH down ~4% from 1,712 to 1,630, nearly tagging the 1,626 demand zone. Accumulation into weakness on the week, oversold on M15 with RSI under 25. Entry at the demand zone to catch the bounce, with a tight ~1.5% stop and a first target back at 1,650.',
        chart: '/ai-agent/2026-06-09-eth.jpg',
        chartAlt:
          'ETH/USDT 15m chart — long from 1,628 with stop at 1,606; price rallies up through the 1,650 target before easing back.',
      },
    ],
  },
  {
    date: '2026-06-10',
    marketInsight:
      'High-impact news held the Agent out of the market today. Overnight, the Humanity Protocol multisig was compromised — roughly 300M tokens minted across 17 related wallets — and a four-year-old vulnerability in Zcash’s Orchard pool was disclosed, sending ZEC down ~10% on panic. With the security sector under pressure and a likely dead-cat bounce setting traps, the disciplined call was to stand aside. No trade taken.',
    signals: [],
    newsHold: true,
  },
  {
    date: '2026-06-11',
    marketInsight:
      'A news-driven tape, so the Agent stood down. The CFTC chair acknowledged current rules can’t classify Hyperliquid and are being rewritten; Circle moved to route the bulk of USDC yield back to the protocol; and Coinbase took on management of $6B of on-chain USDC. Net constructive for DeFi, but with regulation headlines moving prices, the call was to wait for the dust to settle rather than trade the noise. No trade taken.',
    signals: [],
    newsHold: true,
  },
  {
    date: '2026-06-12',
    marketInsight:
      'No high-impact crypto news on the calendar — no CPI, FOMC or NFP, no major Binance listing and no exploits — with Fear & Greed pinned at 12 (Extreme Fear) while BTC, SOL and XRP all ticked quietly green. A silent-recovery tape. One name cleared the full-confidence bar: SOL, the day’s momentum leader across the top 5, set up for a long scalp. Two spot-only names were noted watch-only, not part of the ticket — XMR after its privacy-upgrade pop and BACKPACK on mid-cap accumulation.',
    signals: [
      {
        asset: 'SOL/USDT',
        direction: 'Long',
        entry: '66.76',
        stopLoss: '65.30',
        takeProfit: 'TP1 67.50 · TP2 68.40',
        leverage: '3x',
        result: 'Hit TP2 (+1.1R)',
        outcome: 'profit',
        reason:
          'SOL was the day’s momentum leader across the top 5, up ~2.4%. Open interest up 2.33% with funding only mildly positive (0.002%) — bullish but not overextended. 24h short liquidations of just $640K against $3.35M of longs left shorts still leaning in, primed to be squeezed once price pushed off the solid $66 intraday support, with Fear & Greed at 12 adding squeeze fuel.',
        chart: '/ai-agent/2026-06-12-sol.jpg',
        chartAlt:
          'SOL/USDT 15m chart — long from 66.76 with stop at 65.30; price rallies up through the 67.50 and 68.40 targets to ~68.66.',
      },
    ],
  },
  {
    date: '2026-06-15',
    marketInsight:
      'No high-impact news today. Fed rate steady at 3.62%, the Iran peace deal already priced in from the day before — clean conditions for scalping. The risk-on narrative still lingered in altcoin momentum. One name cleared full confidence: HYPE, riding a short-squeeze setup with negative funding and rising OI.',
    signals: [
      {
        asset: 'HYPE/USDT',
        direction: 'Long',
        entry: '65.95',
        stopLoss: '64.20',
        takeProfit: '67.69',
        leverage: '3x',
        result: 'Hit TP (+1.0R)',
        outcome: 'profit',
        reason:
          'US-Iran peace deal risk-on narrative still flowing — HYPE surged 9.4% in 24h on $976M volume with OI up 11%. Binance funding rate deeply negative at -0.8%, meaning heavy short positioning primed for a squeeze. Long/short ratio at just 1.13 against an average of 1.19 — bearish crowd leaning in, contrarian fuel for the move. Entry on the M5 intraday support retest after a breakdown candle.',
        chart: '/ai-agent/2026-06-15-hype.jpg',
        chartAlt:
          'HYPE/USDT 15m chart — long from 65.95 with stop at 64.20; price squeezes up through the 67.69 target zone to ~67.93.',
      },
    ],
  },
  {
    date: '2026-06-16',
    marketInsight:
      'High-impact news day: BOJ hiked rates to 1% — the highest since 1995 — while T. Rowe Price\'s ETF approval triggered active rotation across 15 crypto assets, and BTC\'s Puell Multiple sat at 0.51 (a historical bottom level). Net assessment: institutional catalysts positive, macro mild. Trading recommended with caution on BOJ risk-sentiment spillover. Two names cleared full confidence — UNI on a brutal fundamental re-rating, and AERO on fresh capital inflows.',
    signals: [
      {
        asset: 'UNI/USDT',
        direction: 'Long',
        entry: '2.946',
        stopLoss: '2.680',
        takeProfit: '3.209',
        leverage: '3x',
        result: 'Hit TP (+1.0R)',
        outcome: 'profit',
        reason:
          'Catalyst-driven: StanChart initiated coverage with a $6.50 PT for H2 2026 (~140% upside), BlackRock and Fidelity already positioned, and UNI\'s price-to-fee ratio at just 2.6x versus Hyperliquid\'s 10.5x — deeply undervalued. Volume up 13% in 24h, OI up 16.7% on Binance, funding rate capped at the 0.01% maximum — bulls paying maximum premium, a sign of strong conviction.',
        chart: '/ai-agent/2026-06-16-uni.jpg',
        chartAlt:
          'UNI/USDT 15m chart — long from 2.946 with stop at 2.680; price rallies through the ascending channel into the 3.209 target zone to ~3.25.',
      },
      {
        asset: 'AERO/USDT',
        direction: 'Long',
        entry: '0.450',
        stopLoss: '0.421',
        takeProfit: '0.480',
        leverage: '3x',
        result: 'Hit TP (+1.0R)',
        outcome: 'profit',
        reason:
          'AERO pumping 14.7% on $30.8M volume with OI up 32% in 24h — fresh capital flowing in. Fundamentals strong: $3.8M/month distributed to veAERO holders, trading volume equal to one-third of Uniswap. Dual catalyst: liquidity migration to Arc-compatible pools before July 6 deadline, plus MiCA USDT delisting on July 1 funnelling traffic toward AERO.',
        chart: '/ai-agent/2026-06-16-aero.jpg',
        chartAlt:
          'AERO/USDT 15m chart — long from 0.450 with stop at 0.421; price pushes through the ascending channel and tags the 0.480 target zone before pulling back.',
      },
    ],
  },
  {
    date: '2026-06-17',
    marketInsight:
      'No high-impact news. The biggest headlines from yesterday — Coinbase launching 13 products and Bitwise staking HYPE — weren\'t strong enough to move the market. Clean conditions. One name cleared the confidence bar: PENDLE, showing strong technical momentum and aggressive funding. The trade was taken but did not hold — price reversed and hit the stop.',
    signals: [
      {
        asset: 'PENDLE/USDT',
        direction: 'Long',
        entry: '1.455',
        stopLoss: '1.410',
        takeProfit: '1.560',
        leverage: '2.5x',
        result: 'Hit SL (-1R)',
        outcome: 'stoploss',
        reason:
          'PENDLE up 5% on the day with RSI at 71 (strong but not yet extreme), MACD histogram positive, and Bollinger Band broken upper with widening bandwidth — momentum intact. Binance funding rate at the 1% cap, meaning longs were paying heavy premium, yet OI rose 5% in 24h: when OI climbs alongside max funding, it signals smart money believes the trend isn\'t over. Three White Soldiers appeared three times in the prior two days. The setup was valid but price reversed sharply and hit the stop.',
        chart: '/ai-agent/2026-06-17-pendle.jpg',
        chartAlt:
          'PENDLE/USDT 15m chart — long from 1.455 with stop at 1.410; price consolidates near entry then breaks down sharply through the stop-loss level to ~1.383.',
      },
    ],
  },
  {
    date: '2026-06-18',
    marketInsight:
      'Three names were on the radar — ENA with institutional inflow and whale on-chain accumulation, AT with a wild volume-to-cap ratio but already past the entry limit and overbought, and VELVET showing a bottom reversal pattern but no breakout confirmation above $0.40. Each had a thesis, but none cleared every filter cleanly enough. Discipline over FOMO — no entry taken.',
    signals: [],
  },
  {
    date: '2026-06-19',
    marketInsight:
      'A heavy tape — $361M in long liquidations still unwinding, Iran geopolitics unresolved, and BTC dominance climbing to 56% draining altcoin flows. SOL had bearish structure but was already deeply oversold, risking a snapback bounce. ENA showed whale accumulation and a multi-touch support, but the broader environment was hostile. HYPE was too far from its ATH to short with any edge. Nothing cleared the bar — the honest call was to stand aside.',
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

/** Signal/day counts for a year+month (honest tally — no $/%). News-hold days are
 *  counted separately from the Agent's own no-signal days. */
export function tallyFor(
  year: number,
  month: number,
): { profit: number; stoploss: number; noSignalDays: number; newsDays: number } {
  let profit = 0
  let stoploss = 0
  let noSignalDays = 0
  let newsDays = 0
  for (const session of entriesFor(year, month)) {
    if (session.signals.length === 0) {
      if (session.newsHold) newsDays += 1
      else noSignalDays += 1
      continue
    }
    for (const sig of session.signals) {
      if (sig.outcome === 'profit') profit += 1
      else stoploss += 1
    }
  }
  return { profit, stoploss, noSignalDays, newsDays }
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

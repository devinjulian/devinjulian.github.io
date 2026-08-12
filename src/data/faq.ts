export interface FAQItem {
  q: string
  a: string
}
export interface FAQGroup {
  title: string
  items: FAQItem[]
}

/** Pre-sale FAQ. Answers are grounded in PRD §8 / src/data and kept to one or two
 *  sentences — this is a sales page, not documentation. Where a fact isn't decided yet
 *  (e.g. refunds), the answer points to direct contact rather than inventing one. */
export const faqGroups: FAQGroup[] = [
  {
    title: 'Getting started',
    items: [
      {
        q: 'What do I need to run the machines?',
        a: 'An MT5 account with a broker that allows grid trading at 1:500–1:1000 leverage, and a VPS so they keep running when your computer is off.',
      },
      {
        q: 'How much capital do I need?',
        a: '$10,000 on a standard account — the strategy was built at a 0.1 minimum lot and needs that behind it. Starting smaller? Use a cent account from $100: same machines, same strategy, one-hundredth of the scale.',
      },
      {
        q: 'Which platform?',
        a: 'MetaTrader 5 only. MT4 is no longer supported.',
      },
      {
        q: 'Do I need set files?',
        a: 'Omnicor and Cenith are plug-and-play. Golden ships with two set files, one per timeframe.',
      },
    ],
  },
  {
    title: 'Plans & billing',
    items: [
      {
        q: 'What does a plan cost?',
        a: '$32 a month with one of our partner brokers, or $53 a month on any broker you choose. Both run all three machines.',
      },
      {
        q: 'Can I cancel?',
        a: 'Any month. There is no contract and no minimum term.',
      },
      {
        q: 'Why is the Partner (IB) rate lower?',
        a: 'It is tied to opening an account under one of our introducing brokers — RoboForex, Exness or Tickmill. We state it openly: that partnership is what makes the lower rate possible.',
      },
      {
        q: 'Can I get just one EA?',
        a: 'No. All three run together on every plan — EURUSD, GBPUSD and gold do not lose at the same time, and that is what smooths the combined curve.',
      },
      {
        q: 'What is the Exclusive Membership?',
        a: 'A one-time alternative to monthly: full .mq5 source code, lifetime access, every future release. A fixed number of slots — when the last one goes, it is gone.',
      },
      {
        q: 'How do I pay?',
        a: 'There is no on-site checkout. Message us on Telegram or by email and we arrange it directly.',
      },
    ],
  },
  {
    title: 'Results & risk',
    items: [
      {
        q: 'Are the results guaranteed?',
        a: 'No. The figures shown are backtests (2021–2026, Monte Carlo), and trading carries a substantial risk of loss. Live results vary with broker conditions, spread, slippage and your settings.',
      },
      {
        q: 'Can I verify them myself?',
        a: 'Yes. A third-party track record is published on Myfxbook, and every EA’s full MT5 backtest report sits on its own page.',
      },
      {
        q: 'What is the drawdown?',
        a: 'Stated on every card, next to the return: 53.70% on Omnicor, 25.79% on Cenith, 44.76% on Golden. These are grid systems — the path to the return runs through those drops.',
      },
    ],
  },
  {
    title: 'The lab',
    items: [
      {
        q: 'What is the AI Trading Agent?',
        a: 'Our in-house research system. It reads the economic calendar, the releases and the market context a rule-based EA cannot see. It is not sold separately and it is not something you install.',
      },
      {
        q: 'What are you building next?',
        a: 'More pairs, and deeper research tooling behind the machines you already run. Everything the lab ships is included while your plan is active — you never pay again for a new release.',
      },
    ],
  },
]

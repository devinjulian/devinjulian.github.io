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
        q: 'Do I need to configure anything?',
        a: 'No. All three run on default settings. Set files are only needed if you want Golden on its SL/TP strategy, and they come with the EA.',
      },
      {
        q: 'How many trading accounts can I run?',
        a: 'One. Your licence key is issued to a single account number. The Exclusive Membership is the only route with no account lock.',
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
        q: 'How do I stop?',
        a: 'Simply do not pay for the following month. There is nothing to cancel, no contract and no minimum term.',
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
        a: 'A one-time alternative to monthly: full .mq5 source code, lifetime access, unlimited accounts and every future release. It runs in stages — $2,499 now, then $4,999, and $9,999 is where the price settles for good.',
      },
      {
        q: 'How do I pay?',
        a: 'In USDT — TRC20, ERC20 or BEP20. There is no on-site checkout: message us on Telegram or by email and we send the wallet details in that conversation. We never publish them on this site.',
      },
      {
        q: 'What happens after I pay?',
        a: 'You get the setup guide, open your MT5 account and send us the account number. We send all three EAs plus your licence key. Under 15 minutes end to end.',
      },
      {
        q: 'What if I get stuck installing?',
        a: 'We stay with you until it runs. The guide covers everything including the one server link you add in MetaTrader — the only step people are unfamiliar with is a first VPS install.',
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
    title: 'The AI Trading Agent',
    items: [
      {
        q: 'What does the AI Trading Agent do?',
        a: 'The EA reads the chart. The Agent reads everything the chart cannot — the economic calendar, the releases, the wider market context — and answers whether this is a safe moment to be in.',
      },
      {
        q: 'Do I pay extra for it?',
        a: 'No. It is part of every plan and every membership, at no additional cost.',
      },
    ],
  },
  {
    title: 'The lab',
    items: [
      {
        q: 'What are you building next?',
        a: 'More pairs, and deeper research tooling behind the machines you already run. Everything the lab ships is included while your plan is active — you never pay again for a new release.',
      },
    ],
  },
]

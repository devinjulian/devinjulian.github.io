export interface FAQItem {
  q: string
  a: string
}
export interface FAQGroup {
  title: string
  items: FAQItem[]
}

/** Pre-sale FAQ. Answers are grounded in PRD §8 / src/data. Where a fact isn't decided
 *  yet (e.g. refunds), the answer is deliberately soft and points to direct contact —
 *  nothing is invented. */
export const faqGroups: FAQGroup[] = [
  {
    title: 'Getting started',
    items: [
      {
        q: 'What do I need to run an ATC algorithm?',
        a: 'A MetaTrader 4 or MetaTrader 5 account with a broker, the EA file plus your license, and — for hands-off, around-the-clock running — a VPS is recommended so trades keep executing even when your own computer is off.',
      },
      {
        q: 'MetaTrader 4 or MetaTrader 5?',
        a: 'Both. Every EA ships for MT4 and MT5, so you can run it on whichever platform your broker supports.',
      },
      {
        q: 'Do I need "set files"?',
        a: 'Omnicor and Cenith are plug-and-play with no set files. Golden requires two set files — one per timeframe — and they are provided with the EA.',
      },
      {
        q: 'How much capital do I need to start?',
        a: 'It depends on the EA, your broker leverage, and the risk settings you choose. The backtests use $10,000–$100,000 starting balances as references, not requirements — we will help you size it sensibly when you message us.',
      },
    ],
  },
  {
    title: 'Buying & licenses',
    items: [
      {
        q: 'How do I buy?',
        a: 'There is no on-site checkout. You message us on Telegram or by email naming the bundle or EA you want, and we walk you through the next step from there.',
      },
      {
        q: 'How do licenses work?',
        a: 'Each plan includes a set number of account licenses — the Partner Bundle includes 10, the Standard Bundle is unlimited accounts, and individual EAs include one or two licenses depending on the EA.',
      },
      {
        q: 'What is an IB broker, and why does the Partner Bundle require one?',
        a: 'The Partner Bundle is $199 because it is tied to registering under one of our recommended introducing-broker (IB) partners — RoboForex, Exness, or Tickmill. We state this openly: it is how that entry price stays possible. The Standard Bundle works with any broker you choose.',
      },
      {
        q: 'What does the Founding Members Bundle include?',
        a: 'All three EA source codes (.mq5) delivered instantly, the full PolyBot Python source after its Q3 2026 launch, and everything the lab ships next at the same price you came in at.',
      },
    ],
  },
  {
    title: 'Results & risk',
    items: [
      {
        q: 'Are the results guaranteed?',
        a: 'No. Past performance does not guarantee future results, and trading involves substantial risk of loss. The figures shown are backtests (2021–2026, Monte Carlo method); live results vary with broker conditions, spread, slippage, and the settings you choose.',
      },
      {
        q: 'Can I verify the results myself?',
        a: 'Yes. A live, third-party track record is published on Myfxbook, and every EA’s full MT5 backtest report is available on the Results page.',
      },
      {
        q: 'What is the Monte Carlo method, and what period do the backtests cover?',
        a: 'All figures come from 5-year backtests covering 2021–2026, stress-tested with a Monte Carlo method that resamples trade sequences to gauge robustness rather than relying on a single run.',
      },
    ],
  },
  {
    title: 'PolyBot & what’s next',
    items: [
      {
        q: 'When does PolyBot launch?',
        a: 'PolyBot is in development, launching Q3 2026. No performance claims are made, and Founding Members receive the Python source code after the launch.',
      },
      {
        q: 'What is the AI Trading Agent?',
        a: 'It is the lab’s next frontier — in active research and design. It is decision-support, not a product you can buy today, and no performance claims are made about it. Founding Members will be first in line when it ships.',
      },
    ],
  },
]

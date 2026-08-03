import { links } from '../data'

export interface LegalSection {
  heading: string
  paragraphs: string[]
}
export interface LegalDoc {
  slug: string
  title: string
  kicker: string
  updated: string
  intro: string
  /** Shows the "draft for review" banner — set on anything with owner-specific terms still to confirm. */
  draft?: boolean
  sections: LegalSection[]
}

const UPDATED = '2026-08-03'

export const riskDisclosure: LegalDoc = {
  slug: 'risk-disclosure',
  title: 'Risk Disclosure',
  kicker: 'Legal',
  updated: UPDATED,
  intro:
    'Trading is risky. This page sets out, plainly, what that means for anything you see on this site.',
  sections: [
    {
      heading: 'Trading carries substantial risk',
      paragraphs: [
        'Trading foreign exchange and other leveraged instruments with automated systems carries a substantial risk of loss and is not suitable for everyone. You can lose some or all of your capital. Only trade with money you can afford to lose.',
      ],
    },
    {
      heading: 'Results shown are backtests',
      paragraphs: [
        'The performance figures on this site are derived from backtests on historical data covering 2021–2026, stress-tested with a Monte Carlo method. They are hypothetical and simulated.',
        'Hypothetical results have inherent limitations: they are produced with the benefit of hindsight and do not represent actual trading. Live results will differ, and may differ materially, based on broker conditions, spread, slippage, execution latency, and the parameters you choose. No representation is made that any account will or is likely to achieve results similar to those shown.',
      ],
    },
    {
      heading: 'No guarantees',
      paragraphs: [
        'Past performance does not guarantee future results. Nothing on this site is a promise or guarantee of profit, and no specific return is implied for any period.',
      ],
    },
    {
      heading: 'Not financial advice',
      paragraphs: [
        'The information on this site is for general and educational purposes only and is not personalized financial, investment, legal, or tax advice. Consider your own circumstances and seek advice from a licensed professional before trading.',
      ],
    },
    {
      heading: 'Your responsibility',
      paragraphs: [
        'You are responsible for choosing your broker, configuring the software, and managing your own risk. You can verify our live track record on Myfxbook at any time.',
      ],
    },
  ],
}

export const terms: LegalDoc = {
  slug: 'terms',
  title: 'Terms & License',
  kicker: 'Legal',
  updated: UPDATED,  intro:
    'These terms cover your use of the Algo Trading Center website and the software licenses we provide.',
  sections: [
    {
      heading: 'Agreement',
      paragraphs: [
        'By using this site or purchasing a license from Algo Trading Center, you agree to these terms. If you do not agree, do not use the site or the software.',
      ],
    },
    {
      heading: 'What a license grants',
      paragraphs: [
        'A purchase grants you a license to use the Expert Advisor (EA) software as stated in your plan. On the Partner (IB) and Any Broker tiers, each EA is licensed to one live trading account number at a time and may be swapped to a new account number — up to three times per EA on Partner (IB), and up to ten times per EA on Any Broker — for the lifetime of the product. The Exclusive Membership tier grants you the .mq5 source for your own use, with no account lock.',
        'Every tier includes each EA available at the time of purchase, together with updates and new EA releases as they are published, at no further cost, for as long as the lab maintains them.',
        'The Exclusive Membership tier also includes lifetime access to the AI Trading Agent signals, and to the AI Trading Agent BOT once that software is released. The BOT is still in development; no release date is promised.',
        'The EA software is supplied as MetaTrader 5 builds. MetaTrader 4 is no longer supported.',
      ],
    },
    {
      heading: 'Restrictions',
      paragraphs: [
        'You may not resell, redistribute, sublicense, publish, or share the EA files, license keys, or source code with third parties, and you may not remove or circumvent any licensing or protection mechanism. Licenses are for your own trading use.',
      ],
    },
    {
      heading: 'Brokers and Partner plans',
      paragraphs: [
        'Partner (IB) pricing requires registering a trading account under one of our recommended introducing brokers (RoboForex, Exness, or Tickmill). The Any Broker and Exclusive Membership tiers work with any broker.',
      ],
    },
    {
      heading: 'No warranty; limitation of liability',
      paragraphs: [
        'The software is provided “as is,” without warranty of any kind, including any warranty of profitability or fitness for a particular purpose. To the maximum extent permitted by law, Algo Trading Center is not liable for trading losses or for any indirect or consequential damages arising from use of the software, and any liability is limited to the amount you paid.',
      ],
    },
    {
      heading: 'Changes and contact',
      paragraphs: [
        `We may update these terms; the “last updated” date above reflects the current version. Questions: ${links.email}.`,
      ],
    },
  ],
}

export const privacy: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  kicker: 'Legal',
  updated: UPDATED,  intro:
    'How Algo Trading Center handles the limited information you share with us.',
  sections: [
    {
      heading: 'What we collect',
      paragraphs: [
        'This website is static and does not require an account to browse. We collect personal information only when you choose to contact us — for example, the name or handle, email address, and message content you send via Telegram or email.',
      ],
    },
    {
      heading: 'How we use it',
      paragraphs: [
        'We use the information you send solely to respond to you, arrange a purchase, and deliver and support the products you request.',
      ],
    },
    {
      heading: 'Sharing',
      paragraphs: [
        'We do not sell your personal information. If you choose a Partner plan, your account registration is completed with the introducing broker you select, under that broker’s own terms and privacy policy.',
      ],
    },
    {
      heading: 'Analytics and cookies',
      paragraphs: [
        'The site is intended to run without invasive tracking. If analytics or cookies are added in future, this section will describe what is collected and why.',
      ],
    },
    {
      heading: 'Your choices and contact',
      paragraphs: [
        `You can ask us to access or delete the information you have sent us at any time. Contact: ${links.email}.`,
      ],
    },
  ],
}

export const refunds: LegalDoc = {
  slug: 'refunds',
  title: 'Refund & Purchase Policy',
  kicker: 'Legal',
  updated: UPDATED,  intro:
    'How purchasing works, and how we handle issues — since everything is sold by direct contact.',
  sections: [
    {
      heading: 'How purchasing works',
      paragraphs: [
        'There is no on-site checkout or card capture. You buy by messaging us directly on Telegram or by email, and we arrange delivery from there.',
      ],
    },
    {
      heading: 'Digital products',
      paragraphs: [
        'Our products are digital, and the Exclusive Membership tier includes source code delivered instantly. Because of this, sales are generally final once the files or source have been delivered. If a product is not functioning as described, contact us and we will work with you to resolve it.',
      ],
    },
    {
      heading: 'Lifetime access',
      paragraphs: [
        'Licenses are lifetime: you pay once for the tier you chose, and you continue to receive updates and new EA releases at no further cost, for as long as the lab maintains them. The signal subscription is separate and is billed monthly; the Exclusive Membership tier includes that access for life instead.',
      ],
    },
    {
      heading: 'Pricing',
      paragraphs: [
        'Prices are stated on the relevant product page at the time of purchase and may change for future buyers. A purchased license is not affected by later price changes — what you bought stays yours under the terms you bought it.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about a purchase: ${links.email}.`],
    },
  ],
}

export const legalDocs = [riskDisclosure, terms, privacy, refunds]

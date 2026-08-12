export interface Review {
  name: string
  initials: string
  tag: string
  quote: string
  /** Optional: a real customer photo (with their consent). Falls back to the initials monogram. */
  photo?: string
}

/** Real member reviews (e.g. from the Telegram community). Only genuine, consented
 *  testimonials belong here — never invented ones (see PRD §10 / CLAUDE.md).
 *  Light typesetting cleanup of real messages is fine (typos, punctuation); changing
 *  the meaning is not.
 *
 *  Tags follow the current product names: "Exclusive Member" (formerly Founding Member —
 *  same people, same purchase), "Verified member", "Hands-off member". **"Telegram
 *  community" means exactly that** — someone from the channel who has not necessarily
 *  bought anything. Never promote that tag to a buyer label; it would manufacture social
 *  proof out of people who only ever said hello. */
export const reviews: Review[] = [
  {
    name: 'Martin Gaussian',
    initials: 'MG',
    tag: 'Exclusive Member',
    quote:
      'Absolutely incredible. I got the source code at a great price and even gained access to the next project. That is just amazing.',
  },
  {
    name: 'Anton',
    initials: 'A',
    tag: 'Exclusive Member',
    quote:
      "The developer is doing an amazing job. The source code for the 3 EAs is working perfectly. I'm still testing PolyBot and looking forward to the launch of the AI Trading Agent. Kudos to Devin Julian and team!",
  },
  {
    name: 'Nadya',
    initials: 'N',
    tag: 'Hands-off member',
    quote:
      "My husband works, and I earn passive income from this bot. Thank you, Devin! Now I can show off to my husband, even though I don't understand trading at all.",
  },
  {
    name: 'Theodore',
    initials: 'T',
    tag: 'Verified member',
    quote:
      "This guy doesn't just sell; he also educates. I've never encountered anyone like this before.",
  },
  {
    name: 'Alina',
    initials: 'A',
    tag: 'Verified member',
    quote:
      "I'm using 3 Forex bots, and the correlation between them is excellent. I am truly enjoying my time now.",
  },
  {
    name: 'Arthur',
    initials: 'A',
    tag: 'Exclusive Member',
    quote:
      "I'm using 3 Forex Bots and the PolyBot, and it's absolutely amazing. I'm just waiting for the AI Trading Agent to be released. Your work is outstanding, and we are willing to wait.",
  },
  {
    name: 'Campbell',
    initials: 'C',
    tag: 'Verified member',
    quote:
      "An absolutely amazing project. They don't just sell, they also explain the risks involved.",
  },
  {
    name: 'Louis',
    initials: 'L',
    tag: 'Hands-off member',
    quote:
      "I'm a full-time traveler, and this bot gives me the confidence to just leave it and let it work for me.",
  },
  {
    name: 'Helena',
    initials: 'H',
    tag: 'Hands-off member',
    quote:
      'As a mother of two, this bot has been a huge help. I still get a passive income even though I know nothing about trading.',
  },
  {
    name: 'Shaidd',
    initials: 'S',
    tag: 'Verified member',
    quote:
      'I am using the Omnicor EA for capital diversification. Thank you for the advice and tutorials, Devin.',
  },
  {
    name: 'Leo',
    initials: 'L',
    tag: 'Verified member',
    quote:
      "I don't understand anything about trading, but Devin and his team have been incredibly patient in helping me. Such an amazing project. Can't wait for the AI Trading Agent.",
  },
  {
    name: 'Chen',
    initials: 'C',
    tag: 'Verified member',
    quote: 'This is exactly what I need. Thanks also to the ATC team for the excellent advice.',
  },
  {
    name: 'Alejandro',
    initials: 'A',
    tag: 'Telegram community',
    quote:
      'Looking forward to the AI Trading Agent release. Please take your time, Devin. Make it extraordinary!',
  },
  {
    name: 'Elijah',
    initials: 'E',
    tag: 'Telegram community',
    quote:
      "Hey Devin, save one Founding Member slot for me. Let me be a part of this project's development!",
  },
  {
    name: 'Daniel',
    initials: 'D',
    tag: 'Telegram community',
    quote: 'Trust in your project!',
  },
]

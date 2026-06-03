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
 *  the meaning is not. */
export const reviews: Review[] = [
  {
    name: 'Martin Gaussian',
    initials: 'MG',
    tag: 'Founding Member',
    quote:
      'Absolutely incredible. I got the source code at a great price and even gained access to the next project — that is just amazing.',
  },
  {
    name: 'Nadya',
    initials: 'N',
    tag: 'Hands-off user',
    quote:
      "My husband works, and I earn passive income from this bot. Thank you, Devin! Now I can show off to my husband — even though I don't understand trading at all.",
  },
  {
    name: 'Theodore',
    initials: 'T',
    tag: 'Verified buyer',
    quote:
      "This guy doesn't just sell; he also educates. I've never encountered anyone like this before.",
  },
  {
    name: 'Alina',
    initials: 'A',
    tag: 'Verified buyer',
    quote:
      "I'm using 3 Forex bots, and the correlation between them is excellent. I am truly enjoying my time now.",
  },
  {
    name: 'Campbell',
    initials: 'C',
    tag: 'Verified buyer',
    quote:
      "An absolutely amazing project. They don't just sell, they also explain the risks involved.",
  },
  {
    name: 'Louis',
    initials: 'L',
    tag: 'Hands-off user',
    quote:
      "I'm a full-time traveler, and this bot gives me the confidence to just leave it and let it work for me.",
  },
  {
    name: 'Helena',
    initials: 'H',
    tag: 'Hands-off user',
    quote:
      'As a mother of two, this bot has been a huge help. I still get a passive income even though I know nothing about trading.',
  },
  {
    name: 'Shaidd',
    initials: 'S',
    tag: 'Omnicor user',
    quote:
      'I am using the Omnicor EA for capital diversification. Thank you for the advice and tutorials, Devin.',
  },
  {
    name: 'Leo',
    initials: 'L',
    tag: 'Verified buyer',
    quote:
      "I don't understand anything about trading, but Devin and his team have been incredibly patient in helping me. Such an amazing project — can't wait for the AI Trading Agent.",
  },
  {
    name: 'Chen',
    initials: 'C',
    tag: 'Verified buyer',
    quote: 'This is exactly what I need. Thanks also to the ATC team for the excellent advice.',
  },
  {
    name: 'Alejandro',
    initials: 'A',
    tag: 'Telegram member',
    quote:
      'Looking forward to the AI Trading Agent release. Please take your time, Devin. Make it extraordinary!',
  },
  {
    name: 'Elijah',
    initials: 'E',
    tag: 'Telegram member',
    quote:
      "Hey Devin, save one Founding Member slot for me. Let me be a part of this project's development!",
  },
  {
    name: 'Daniel',
    initials: 'D',
    tag: 'Telegram member',
    quote: 'Trust in your project!',
  },
]

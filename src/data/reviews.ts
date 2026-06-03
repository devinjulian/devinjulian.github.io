export interface Review {
  name: string
  initials: string
  tag: string
  quote: string
  /** Optional: a real customer photo (with their consent). Falls back to the initials monogram. */
  photo?: string
}

/** Real member reviews (e.g. from the Telegram community). Only genuine, consented
 *  testimonials belong here — never invented ones (see PRD §10 / CLAUDE.md). */
export const reviews: Review[] = [
  {
    name: 'Martin Gaussian',
    initials: 'MG',
    tag: 'Founding Member',
    quote:
      'Absolutely incredible. I got the source code at a great price and even gained access to the next project — that is just amazing.',
  },
  {
    name: 'Alina',
    initials: 'A',
    tag: 'Verified buyer',
    quote:
      "I'm using 3 Forex bots, and the correlation between them is excellent. I am truly enjoying my time now.",
  },
]

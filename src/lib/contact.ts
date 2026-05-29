import { links } from '../data'

/** Suggested message naming what the visitor wants, so Devin knows before they say a word (PRD §9). */
export function buildMessage(item?: string): string {
  return item
    ? `Hi ATC — I'd like the ${item}. Can you walk me through the next step?`
    : `Hi ATC — I'm interested in claiming a spot. Can you walk me through the next step?`
}

/** mailto: with the chosen bundle/EA pre-filled into subject + body. */
export function emailHref(item?: string): string {
  const subject = item ? `Claiming: ${item}` : 'Claiming a spot'
  const body = buildMessage(item)
  return `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Telegram channel deep link. (t.me channel links can't carry a pre-filled message,
 *  so the ContactPanel shows the suggested text to copy alongside this link.) */
export function telegramHref(): string {
  return links.telegram
}

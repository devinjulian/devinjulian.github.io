import { membershipLadder } from '../data'
import { cn } from '../lib/cn'

/** The Exclusive Membership slot ladder (PRD §14.1).
 *
 *  The whole ladder is shown at once — including the prices still to come — because the
 *  gap between today's price and the final one is the entire mechanism. Sold-out rungs
 *  stay visible and struck through: proof that the last increase actually happened is
 *  what makes the next one credible.
 *
 *  Every number here comes from `pricing.json` and is maintained by hand. It must always
 *  be true; the counter is never reset and a closed rung is never reopened. */
export function MembershipLadder({ className }: { className?: string }) {
  const { stages, closesAfterFinal } = membershipLadder
  const lastIndex = stages.length - 1

  return (
    <div className={className}>
      <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
        Membership slots
      </p>

      <ol className="mt-4 space-y-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10">
        {stages.map((s, i) => {
          const isOpen = s.state === 'open'
          const isSoldOut = s.state === 'soldOut'
          const isFinal = i === lastIndex

          return (
            <li
              key={s.price}
              className={cn(
                'flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4',
                isOpen ? 'bg-gold/10' : 'bg-surface/50',
              )}
            >
              <span
                className={cn(
                  'font-display text-2xl font-light',
                  isSoldOut && 'text-muted/60 line-through',
                  isOpen ? 'text-ink' : 'text-muted',
                )}
              >
                {s.price}
              </span>

              <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase">
                {isSoldOut ? (
                  <span className="text-muted/60">Sold out</span>
                ) : isOpen ? (
                  <span className="text-gold">
                    {s.slotsLeft} of {s.slots} left
                  </span>
                ) : (
                  <span className="text-muted/80">{s.slots} slots</span>
                )}
              </span>

              {isFinal && (
                <span className="font-mono text-[0.7rem] tracking-[0.15em] text-muted/80 uppercase">
                  Final price
                </span>
              )}
            </li>
          )
        })}
      </ol>

      {closesAfterFinal && (
        <p className="mt-4 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted">
          These slots fund the AI Trading Agent BOT's development. Once the last one is
          taken the membership closes for good, and a monthly subscription becomes the only
          way in.{' '}
          <strong className="font-semibold text-ink">This price will never come down.</strong>
        </p>
      )}
    </div>
  )
}

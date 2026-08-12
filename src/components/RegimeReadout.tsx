/** How the Agent reaches a position size, drawn as a diagram of the method rather than a
 *  reading. It names the three axes and what each is measured against, then shows the
 *  single output they collapse into.
 *
 *  Deliberately carries no values: a specific volatility level or budget figure would be
 *  invented data dressed as a live feed. The mechanism is the claim, and it needs no
 *  numbers to be understood. Pure CSS and SVG — no library, no canvas. */

const AXES = [
  { k: 'Volatility', scale: 'against a 252-day window' },
  { k: 'Trend', scale: 'ADX and moving-average structure' },
  { k: 'Correlation', scale: 'across all three pairs at once' },
]

/** Home-page teaser: the same three axes and the same output, stripped to one glance. */
export function RegimeReadoutCompact() {
  return (
    <div className="glass glass-gold rounded-3xl p-6 sm:p-8">
      <ul className="space-y-4">
        {AXES.map((a) => (
          <li key={a.k} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="font-mono text-[0.7rem] tracking-[0.15em] text-ink uppercase">
              {a.k}
            </span>
            <span className="font-mono text-[0.65rem] text-muted/80">{a.scale}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-ink/10 pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
            Risk budget
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
            Set every session
          </span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-gold-deep via-gold to-signal" />
        <p className="mt-4 text-sm leading-relaxed text-muted">
          One number, and it scales everything — lot size, grid depth, and how many baskets
          may run at once.
        </p>
      </div>
    </div>
  )
}

export function RegimeReadout() {
  return (
    <div className="glass glass-gold grid gap-8 rounded-3xl p-7 sm:p-9 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      {/* What goes in */}
      <div>
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
          What it measures
        </p>
        <ul className="mt-6 space-y-5">
          {AXES.map((a) => (
            <li key={a.k} className="border-b border-ink/10 pb-5 last:border-0 last:pb-0">
              <p className="font-mono text-[0.8rem] tracking-[0.15em] text-ink uppercase">
                {a.k}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.scale}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* What comes out */}
      <div className="flex flex-col justify-center border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
          What comes out
        </p>
        <p className="mt-5 font-display text-4xl leading-tight font-light text-ink sm:text-5xl">
          One risk budget.
        </p>
        <div className="mt-6 h-2 rounded-full bg-gradient-to-r from-gold-deep via-gold to-signal" />
        <p className="mt-3 flex justify-between font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
          <span>Hold back</span>
          <span>Full size</span>
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Set session by session. It scales lot size, grid depth and how many baskets may run
          at once — so a dangerous market is met with a smaller position, not a blocked one.
        </p>
      </div>
    </div>
  )
}

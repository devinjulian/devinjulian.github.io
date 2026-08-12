/** The Agent's readout, drawn as an instrument panel: three regime axes on the left, the
 *  risk budget they produce on the right.
 *
 *  The values here are a **worked example**, labelled as such on the page — an illustration
 *  of how the axes combine into one number, not a live feed. Pure CSS and SVG, no library,
 *  no canvas; the fills animate on width/transform only. */

const AXES = [
  {
    k: 'Volatility',
    state: 'Elevated',
    pct: 72,
    scale: 'measured against a 252-day window',
  },
  {
    k: 'Trend',
    state: 'Trending',
    pct: 84,
    scale: 'ADX and moving-average structure',
  },
  {
    k: 'Correlation',
    state: 'High',
    pct: 81,
    scale: 'across all three pairs at once',
  },
]

const BUDGET = 40

export function RegimeReadout() {
  // Arc geometry for the budget dial — a half circle, drawn once and dashed to the value.
  const R = 68
  const CIRC = Math.PI * R

  return (
    <div className="glass glass-gold grid gap-8 rounded-3xl p-7 sm:p-9 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      {/* Axes */}
      <div>
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
          What it measures
        </p>
        <ul className="mt-6 space-y-6">
          {AXES.map((a) => (
            <li key={a.k}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.75rem] tracking-[0.15em] text-ink uppercase">
                  {a.k}
                </span>
                <span className="font-mono text-[0.75rem] tracking-[0.15em] text-gold uppercase">
                  {a.state}
                </span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold"
                  style={{ width: `${a.pct}%` }}
                />
              </div>
              <p className="mt-2 font-mono text-[0.65rem] text-muted/80">{a.scale}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Budget dial */}
      <div className="flex flex-col items-center justify-center border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
        <svg viewBox="0 0 160 96" className="w-full max-w-[220px]" aria-hidden>
          <path
            d={`M 12 84 A ${R} ${R} 0 0 1 148 84`}
            fill="none"
            stroke="currentColor"
            className="text-ink/10"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d={`M 12 84 A ${R} ${R} 0 0 1 148 84`}
            fill="none"
            stroke="url(#budget)"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={`${(BUDGET / 100) * CIRC} ${CIRC}`}
          />
          <defs>
            <linearGradient id="budget" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-gold-deep)" />
              <stop offset="100%" stopColor="var(--color-gold)" />
            </linearGradient>
          </defs>
        </svg>

        <p className="-mt-6 font-display text-5xl font-light text-ink">
          {BUDGET}
          <span className="text-2xl text-muted">%</span>
        </p>
        <p className="mt-2 text-center font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
          Risk budget
        </p>
        <p className="mt-4 max-w-[24ch] text-center text-sm leading-relaxed text-muted">
          Lot size, grid depth and how many baskets may run at once — all scaled by this one
          number.
        </p>
      </div>
    </div>
  )
}

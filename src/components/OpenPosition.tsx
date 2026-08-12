/** What the Agent does after a basket is already running.
 *
 *  The entry decision is the easy half. A grid's danger is depth, and depth builds after
 *  you are in — so the regime that was safe at entry has to keep being checked while the
 *  position is open. Three states, drawn as a progression. */

const STATES = [
  {
    k: 'Regime holds',
    v: 'The basket works the way it was designed to. Full depth stays available.',
    tone: 'text-signal',
    fill: 'w-full bg-signal/70',
  },
  {
    k: 'Regime turns',
    v: 'No new levels are added. The basket stops growing while the existing one manages out.',
    tone: 'text-gold',
    fill: 'w-1/2 bg-gold/80',
  },
  {
    k: 'Regime breaks',
    v: 'Margin is freed and the basket is closed, rather than left to compound into the move.',
    tone: 'text-warn',
    fill: 'w-1/6 bg-warn/80',
  },
]

export function OpenPosition() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {STATES.map((s) => (
        <article key={s.k} className="glass flex flex-col rounded-3xl p-6">
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
            <div className={`h-full rounded-full ${s.fill}`} />
          </div>
          <p
            className={`mt-5 font-mono text-[0.7rem] tracking-[0.2em] uppercase ${s.tone}`}
          >
            {s.k}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.v}</p>
        </article>
      ))}
    </div>
  )
}

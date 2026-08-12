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

/** The mechanics it actually works the basket with. ATR spacing leads because it is the
 *  one most grid EAs get wrong — a fixed pip grid is either too tight in a fast market or
 *  too wide in a quiet one, and it cannot be both. */
const TOOLS = [
  {
    k: 'ATR-spaced grid',
    v: 'Levels are placed by current volatility, never a fixed pip count. The grid tightens when the market is quiet and widens when it turns violent.',
    lead: true,
  },
  {
    k: 'Breakeven',
    v: 'Once a basket is far enough ahead, its risk comes off the table.',
  },
  {
    k: 'Trailing stop',
    v: 'Profit follows the move instead of waiting on a fixed target.',
  },
  {
    k: 'Partial close',
    v: 'Size comes off in pieces — banking progress while the rest keeps running.',
  },
]

export function OpenPosition() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {STATES.map((s) => (
          <article key={s.k} className="glass flex flex-col rounded-3xl p-6">
            <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
              <div className={`h-full rounded-full ${s.fill}`} />
            </div>
            <p className={`mt-5 font-mono text-[0.7rem] tracking-[0.2em] uppercase ${s.tone}`}>
              {s.k}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.v}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {TOOLS.map((t) => (
          <article
            key={t.k}
            className={`glass flex flex-col rounded-3xl p-6 ${t.lead ? 'glass-gold' : ''}`}
          >
            <p
              className={`font-mono text-[0.7rem] tracking-[0.2em] uppercase ${
                t.lead ? 'text-gold' : 'text-ink'
              }`}
            >
              {t.k}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.v}</p>
          </article>
        ))}
      </div>
    </>
  )
}

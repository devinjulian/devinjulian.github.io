/** Three charts, one bet. EURUSD, GBPUSD and XAUUSD are all quoted against the dollar, so
 *  three independent grids can be one concentrated position without anyone noticing.
 *  Drawn as three chips converging on a single exposure bar — SVG connectors, CSS fill. */

const PAIRS = ['EURUSD', 'GBPUSD', 'XAUUSD']

export function UsdExposure() {
  return (
    <div className="glass rounded-3xl p-7 sm:p-9">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
        {/* Three pairs */}
        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {PAIRS.map((p) => (
            <li
              key={p}
              className="rounded-2xl px-4 py-3 text-center font-mono text-[0.75rem] tracking-[0.15em] text-ink uppercase shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)] lg:text-left"
            >
              {p}
            </li>
          ))}
        </ul>

        {/* Converging into one exposure */}
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-gold uppercase">
              Combined dollar exposure
            </span>
            <span className="font-mono text-[0.7rem] tracking-[0.15em] text-warn uppercase">
              Concentrated
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-gold-deep via-gold to-warn" />
          </div>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            Three charts. <em className="text-gold">One trade on the dollar.</em>
          </p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
            Run them blind to each other and a strong dollar move puts every grid underwater at
            the same moment. The Agent sees all three books together and caps what they add up
            to — not what each one does alone.
          </p>
          <p className="mt-4 max-w-prose rounded-2xl px-4 py-3 text-sm leading-relaxed text-ink shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]">
            <span className="font-mono text-[0.7rem] tracking-[0.15em] text-gold uppercase">
              In practice —{' '}
            </span>
            if the EURUSD basket is already deep, a same-direction entry on GBPUSD is refused.
            One dollar trade at a time, not three.
          </p>
        </div>
      </div>
    </div>
  )
}

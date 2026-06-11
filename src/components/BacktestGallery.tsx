import { useState } from 'react'
import { backtest, type EA } from '../data'
import { Lightbox, type LightboxImage } from './Lightbox'

/** The real MT5 proof, kept one click away: a labelled trigger per timeframe that
 *  opens the full backtest report in the lightbox. Renders nothing if no reports exist. */
export function BacktestGallery({ ea }: { ea: EA }) {
  const items = ea.backtests ?? []
  const [lightbox, setLightbox] = useState<LightboxImage>(null)

  if (items.length === 0) return null

  return (
    <div className="mt-10">
      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-muted/80 uppercase">
        Verified MT5 backtest · {backtest.period} · {backtest.method}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {items.map((bt) => (
          <button
            key={bt.tf}
            type="button"
            onClick={() =>
              setLightbox({ src: bt.report, alt: `${ea.name} ${bt.tf} full backtest report` })
            }
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-gold uppercase transition-colors hover:border-gold/60"
          >
            {bt.tf} report <span aria-hidden>↗</span>
          </button>
        ))}
      </div>
      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}

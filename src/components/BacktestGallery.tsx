import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { backtest, type EA } from '../data'

type LightboxImage = { src: string; alt: string } | null

/** Smooth zoom-in overlay for a backtest screenshot. Esc / backdrop / close button dismiss. */
function Lightbox({ image, onClose }: { image: LightboxImage; onClose: () => void }) {
  const reduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!image) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image && (
        <m.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-void/90 backdrop-blur-sm" />
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-ink/10 hover:text-ink"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
          <m.img
            src={image.src}
            alt={image.alt}
            className="relative max-h-full max-w-6xl rounded-lg border border-ink/15 shadow-2xl shadow-black/60"
            initial={{ scale: reduced ? 1 : 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: reduced ? 1 : 0.96, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.26, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
        </m.div>
      )}
    </AnimatePresence>
  )
}

/** The real MT5 proof, kept one click away: a labelled trigger per timeframe that
 *  opens the full backtest report in the lightbox. Renders nothing if no reports exist. */
export function BacktestGallery({ ea }: { ea: EA }) {
  const items = ea.backtests ?? []
  const [lightbox, setLightbox] = useState<LightboxImage>(null)

  if (items.length === 0) return null

  return (
    <div className="mt-10">
      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-muted/70 uppercase">
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

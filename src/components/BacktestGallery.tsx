import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { backtest, type Backtest, type EA } from '../data'

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

/** One backtest equity-curve screenshot. Clicking it (or "Full report") opens the lightbox. */
function Shot({
  ea,
  bt,
  onFail,
  onOpen,
}: {
  ea: EA
  bt: Backtest
  onFail: () => void
  onOpen: (img: LightboxImage) => void
}) {
  const [ok, setOk] = useState(true)
  if (!ok) return null

  return (
    <figure className="overflow-hidden rounded-xl border border-ink/10 bg-surface/40">
      <button
        type="button"
        onClick={() => onOpen({ src: bt.equity, alt: `${ea.name} ${bt.tf} backtest equity curve` })}
        className="block w-full cursor-zoom-in"
        aria-label={`Enlarge ${ea.name} ${bt.tf} equity curve`}
      >
        <img
          src={bt.equity}
          alt={`${ea.name} ${bt.tf} backtest equity curve, ${backtest.period}`}
          loading="lazy"
          onError={() => {
            setOk(false)
            onFail()
          }}
          className="block w-full"
        />
      </button>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3 font-mono text-[0.65rem] tracking-wide text-muted">
        <span className="tracking-[0.2em] text-ink uppercase">
          {bt.tf} <span className="text-muted/70 normal-case">· {bt.note}</span>
        </span>
        <button
          type="button"
          onClick={() => onOpen({ src: bt.report, alt: `${ea.name} ${bt.tf} full backtest report` })}
          className="text-gold transition-colors hover:text-gold-deep"
        >
          Full report ↗
        </button>
      </figcaption>
    </figure>
  )
}

/** Per-EA gallery of MT5 backtest screenshots, grouped by timeframe.
 *  Renders nothing until the image files exist (so it never shows empty/broken). */
export function BacktestGallery({ ea }: { ea: EA }) {
  const items = ea.backtests ?? []
  const [failed, setFailed] = useState(0)
  const [lightbox, setLightbox] = useState<LightboxImage>(null)

  if (items.length === 0 || failed >= items.length) return null

  return (
    <div className="mt-12">
      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-muted/70 uppercase">
        Backtest results · {backtest.period} · {backtest.method}
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        {items.map((bt) => (
          <Shot
            key={`${ea.id}-${bt.tf}`}
            ea={ea}
            bt={bt}
            onFail={() => setFailed((n) => n + 1)}
            onOpen={setLightbox}
          />
        ))}
      </div>
      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}

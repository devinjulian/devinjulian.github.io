import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'

export type LightboxImage = { src: string; alt: string } | null

/** Smooth zoom-in overlay for a single image. Esc / backdrop / close button dismiss.
 *  Portals to <body> so it escapes any transformed/overflow ancestor (e.g. a Framer
 *  Motion <Reveal> or a parent Modal), and sits above the Modal (z-[120] > z-[100]).
 *  Safe to nest inside a Modal: it saves/restores the previous body overflow so
 *  closing it doesn't unlock scroll while the Modal underneath is still open, and it
 *  catches Esc in the capture phase so it closes only the lightbox, not the Modal. */
export function Lightbox({ image, onClose }: { image: LightboxImage; onClose: () => void }) {
  const reduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!image) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation() // win over an underlying Modal's Esc handler
      onClose()
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [image, onClose])

  return createPortal(
    <AnimatePresence>
      {image && (
        <m.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-10"
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
    </AnimatePresence>,
    document.body,
  )
}

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, [tabindex]:not([tabindex="-1"])'

/** Accessible modal chrome — backdrop, focus trap, Esc, scroll-lock, return-focus.
 *  Render it conditionally (the caller controls mount/unmount); it assumes it's open. */
export function Modal({
  onClose,
  labelledBy,
  className,
  children,
}: {
  onClose: () => void
  labelledBy?: string
  className?: string
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  // Portal to <body> so the overlay escapes any transformed/overflow ancestor
  // (e.g. Framer Motion <Reveal>, whose transform would otherwise make `fixed`
  // resolve relative to that box instead of the viewport — pushing the modal off-centre).
  return createPortal(
    <div
      className="fixed inset-x-0 top-0 z-[100] flex h-dvh items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-void/85 backdrop-blur-sm"
      />

      {/* data-lenis-prevent: let this panel scroll natively. Lenis (root mode) hijacks
          wheel/touch and would scroll the page behind the modal instead — and stopping
          Lenis to lock the page would preventDefault every event and freeze this panel too. */}
      <div
        ref={dialogRef}
        data-lenis-prevent
        className={cn(
          'relative max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-ink/10 bg-surface/95 p-7 shadow-2xl shadow-black/60',
          className,
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-ink/10 hover:text-ink"
        >
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

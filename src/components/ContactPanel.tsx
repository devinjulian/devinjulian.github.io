import { useEffect, useRef, useState } from 'react'
import { links } from '../data'
import { buildMessage, emailHref, telegramHref } from '../lib/contact'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, [tabindex]:not([tabindex="-1"])'

export function ContactPanel({
  open,
  item,
  onClose,
}: {
  open: boolean
  item?: string
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
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
  }, [open, onClose])

  if (!open) return null

  const message = buildMessage(item)

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the message stays visible to copy by hand.
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-void/85 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-lg border border-ink/10 bg-surface/95 p-7 shadow-2xl shadow-black/60 sm:rounded-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close contact panel"
          className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-ink/10 hover:text-ink"
        >
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </button>

        <p className="font-mono text-[0.7rem] tracking-[0.25em] text-gold uppercase">
          Claim a spot
        </p>
        <h2 id="contact-title" className="mt-3 font-display text-3xl font-light text-ink">
          Two ways in.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {item ? (
            <>
              You're claiming the <span className="text-ink">{item}</span>. No checkout,
              no card capture — you message Devin directly and he takes it from there.
            </>
          ) : (
            <>
              No checkout, no card capture — you message Devin directly and he takes it
              from there. Pick whichever channel suits you.
            </>
          )}
        </p>

        <div className="mt-6 space-y-3">
          {/* Telegram */}
          <div className="rounded-xl border border-ink/10 bg-void/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
                  Telegram
                </p>
                <p className="mt-1 text-sm text-ink">{links.telegramHandle}</p>
              </div>
              <a
                href={telegramHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-void uppercase transition-colors hover:bg-gold-deep"
              >
                Open Telegram
              </a>
            </div>
            <div className="mt-3 rounded-lg border border-ink/10 bg-surface/60 p-3">
              <p className="text-xs leading-relaxed text-muted italic">“{message}”</p>
              <button
                type="button"
                onClick={copyMessage}
                className="mt-2 font-mono text-[0.65rem] tracking-[0.15em] text-gold uppercase transition-colors hover:text-gold-deep"
              >
                {copied ? 'Copied ✓' : 'Copy message'}
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-ink/10 bg-void/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
                  Email
                </p>
                <p className="mt-1 truncate text-sm text-ink">{links.email}</p>
              </div>
              <a
                href={emailHref(item)}
                className="shrink-0 rounded-full border border-ink/20 px-4 py-2 font-mono text-[0.7rem] tracking-[0.15em] text-ink uppercase transition-colors hover:border-gold/60 hover:text-gold"
              >
                Open email
              </a>
            </div>
            <p className="mt-3 text-xs text-muted">
              Subject and message are pre-filled with what you're after.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

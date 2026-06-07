import { useRef } from 'react'
import { reviews } from '../data/reviews'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { ArrowRight } from './icons'

/** Swipeable / draggable testimonials slider. Touch swipes natively (scroll-snap);
 *  desktop drags with the mouse and steps with the arrow buttons. */
export function Reviews() {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0 })

  const step = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.85
    el.scrollBy({ left: amount * dir, behavior: 'smooth' })
  }

  // Mouse drag-to-scroll (touch keeps native momentum scrolling).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = track.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const el = track.current
    if (!el) return
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX)
  }
  const endDrag = () => {
    drag.current.active = false
  }

  const arrow =
    'grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-muted transition-colors hover:border-gold/60 hover:text-gold focus-visible:border-gold/60'

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[0.7rem] tracking-[0.25em] text-gold uppercase">
                In Their Words
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
                The people who stopped <em className="text-gold">watching the screen.</em>
              </h2>
              <p className="mt-3 text-sm text-muted">
                Real messages from our Telegram community, shared with their permission.
              </p>
            </div>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button type="button" onClick={() => step(-1)} aria-label="Previous reviews" className={arrow}>
                <ArrowRight className="rotate-180" size={18} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next reviews" className={arrow}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div
            ref={track}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className="mt-10 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r) => (
              <article
                key={r.name}
                data-card
                className="flex shrink-0 basis-[85%] snap-start flex-col rounded-2xl border border-ink/10 bg-surface/50 p-7 select-none sm:basis-[420px]"
              >
                <span aria-hidden className="font-display text-5xl leading-none text-gold/40">
                  &ldquo;
                </span>
                <p className="mt-1 flex-1 font-display text-xl leading-relaxed font-light text-ink">
                  {r.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                  {r.photo ? (
                    <img
                      src={r.photo}
                      alt={r.name}
                      className="h-11 w-11 rounded-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/10 font-mono text-sm text-gold">
                      {r.initials}
                    </span>
                  )}
                  <div>
                    <p className="text-ink">{r.name}</p>
                    <p className="font-mono text-[0.65rem] tracking-[0.15em] text-muted/70 uppercase">
                      {r.tag}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-6 max-w-3xl font-mono text-[0.62rem] leading-relaxed tracking-wide text-muted/60">
            ATC respects every member's privacy — names and photos appear only with their consent.
            Individual results vary, and past performance does not guarantee future results.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

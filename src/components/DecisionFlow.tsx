import type { ReactNode } from 'react'

/** How a trade gets taken, drawn rather than described. Pure SVG + CSS — no canvas, no
 *  library, no image asset, so it costs nothing to load and scales to any width.
 *  Connectors run horizontally from lg and vertically below it. The sweep animation is
 *  background-position only, and the global prefers-reduced-motion rule stops it. */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const NODES = [
  {
    kicker: 'The EA',
    title: 'Reads the chart',
    body: 'Price action, structure, the setup it was built for. When the technical picture lines up, it raises a signal.',
    icon: (
      <Icon>
        <path d="M3 20h18" />
        <path d="M7 16V9M7 6v1M11 16v-3M11 9v1M15 16v-6M15 7v1M19 16v-9M19 5v1" />
      </Icon>
    ),
  },
  {
    kicker: 'The AI Agent',
    title: 'Checks the world',
    body: 'The calendar, the releases, the context no chart can show. It answers one question: is this a safe moment to be in.',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.4 3.3 8.5s-1.1 6.1-3.3 8.5c-2.2-2.4-3.3-5.4-3.3-8.5S9.8 5.9 12 3.5Z" />
      </Icon>
    ),
  },
  {
    kicker: 'The decision',
    title: 'Trade, or wait',
    body: 'Green and the position opens. Red and the EA stands down and keeps watching — no trade forced where none belongs.',
    icon: (
      <Icon>
        <path d="M4 12.5 9.5 18 20 7" />
      </Icon>
    ),
  },
]

export function DecisionFlow() {
  return (
    <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-0">
      {NODES.map((n, i) => (
        <div key={n.kicker} className="contents">
          <article className="glass flex flex-col rounded-3xl p-6">
            <span className="text-gold">{n.icon}</span>
            <p className="mt-5 font-mono text-[0.65rem] tracking-[0.2em] text-gold uppercase">
              {n.kicker}
            </p>
            <h3 className="mt-2 font-display text-xl leading-tight font-light text-ink">
              {n.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{n.body}</p>
          </article>

          {i < NODES.length - 1 && (
            <div aria-hidden className="grid place-items-center px-0 py-1 lg:px-5 lg:py-0">
              {/* vertical below lg, horizontal from lg */}
              <span className="flow-line-v h-8 w-px lg:hidden" />
              <span className="flow-line hidden h-px w-full min-w-10 lg:block" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

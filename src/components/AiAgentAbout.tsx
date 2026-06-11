import { Check } from './icons'
import { Modal } from './Modal'

/** The Agent's per-session pipeline, shown as a numbered timeline.
 *  CONFIDENTIAL (owner, 2026-06-11): never describe the Agent's internal
 *  composition in public copy — keep the wording generic ("a full research
 *  desk's work"), no enumeration of the specialist roles inside it. */
const STEPS: { title: string; body: string }[] = [
  {
    title: 'Read the market',
    body: 'Each session it works from real, computed market data — price structure, volatility and the broader forces moving the market — not headlines or vibes.',
  },
  {
    title: 'Weigh every angle',
    body: 'It does the work of an entire research desk before a single position is considered — studying the market from multiple independent angles, the way a professional team would.',
  },
  {
    title: 'Commit to one call',
    body: 'Everything distils into a single high-conviction decision — buy, sell, or stand aside. Below conviction, the honest answer is no trade.',
  },
  {
    title: 'Pass the risk gate',
    body: 'A hard risk gate sits after the AI. It sizes the position and sets stop-loss and take-profit, so a single wrong call can never blow the account.',
  },
  {
    title: 'Log it in the open',
    body: 'Every decision, taken or skipped, is recorded in the public log with its reasoning and an R-multiple outcome.',
  },
]

/** What sets it apart from typical "AI trading" tools. */
const DIFFS: { strong: string; rest: string }[] = [
  { strong: 'Probabilistic, not predictive', rest: 'it forms a view of the odds; it never claims to predict the price.' },
  { strong: 'Risk-gated, not a black box', rest: 'hard stops sit after the model and are always shown.' },
  { strong: 'Accountable in public', rest: 'every call lands in the open log before the outcome is known.' },
  { strong: 'Decision-support, not a "money machine"', rest: 'it informs a decision; it never promises profit.' },
]

export function AiAgentAbout({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} labelledBy="ai-about-title" className="max-w-2xl">
      <p className="font-mono text-[0.7rem] tracking-[0.25em] text-gold uppercase">
        The AI Trading Agent
      </p>
      <h2 id="ai-about-title" className="mt-3 font-display text-3xl font-light text-ink">
        How it works
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        It runs the morning routine a serious trading desk would — every session, before a position
        is ever considered.
      </p>

      <ol className="relative mt-7 space-y-6 before:absolute before:top-1 before:bottom-1 before:left-4 before:w-px before:bg-ink/15">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative pl-12">
            <span className="absolute top-0 left-0 z-10 grid h-8 w-8 place-items-center rounded-full border border-gold/40 bg-surface font-mono text-xs text-gold">
              {i + 1}
            </span>
            <h3 className="font-mono text-xs tracking-[0.15em] text-ink uppercase">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-ink/10 bg-void/40 p-5">
        <h3 className="font-mono text-[0.65rem] tracking-[0.2em] text-muted/80 uppercase">
          Why it's different from other AI agents
        </h3>
        <ul className="mt-3 space-y-2.5">
          {DIFFS.map((d) => (
            <li key={d.strong} className="flex gap-3 text-sm leading-relaxed">
              <Check size={16} className="mt-0.5 shrink-0 text-signal" />
              <span className="text-muted">
                <span className="text-ink">{d.strong}</span> — {d.rest}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

import { faqGroups } from '../data/faq'
import { Reveal } from './Reveal'

/** Accessible FAQ using native <details>/<summary>, grouped by topic. */
export function FaqList() {
  return (
    <div className="space-y-14">
      {faqGroups.map((group) => (
        <section key={group.title}>
          <Reveal>
            <h2 className="font-mono text-[0.7rem] tracking-[0.25em] text-gold uppercase">
              {group.title}
            </h2>
          </Reveal>
          <div className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
            {group.items.map((item) => (
              <Reveal key={item.q}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg text-ink transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden
                      className="font-mono text-gold transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 leading-relaxed text-muted">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

import { EquityCurve } from './EquityCurve'

/** Ambient full-bleed equity motif behind the hero copy. Decorative only —
 *  no axes, no numbers (PRD §8). Fills the relatively-positioned hero section. */
export function HeroCanvas() {
  return (
    <div className="hero-curve" aria-hidden>
      <div className="absolute inset-0 opacity-50 sm:opacity-70">
        <EquityCurve uid="hero" />
      </div>
      <span className="absolute right-0 left-0 bottom-[14%] h-px bg-gold/20" />
    </div>
  )
}

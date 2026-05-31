import type { ReactNode } from 'react'

/** Approved per-EA narrative copy (PRD §7.2 / §8). Shared by the Products index and detail pages. */
export const eaNarratives: Record<string, ReactNode> = {
  omnicor: (
    <>
      <p>
        EURUSD is the most liquid pair on earth: the tightest spreads and deepest order
        flow the market offers. Omnicor lives there on purpose. On the M30 and H1 it sits
        slow enough to ignore the noise and fast enough to compound.
      </p>
      <p>
        Its Auto-Lot scaling grows position size with the account, so you never touch a
        setting. No set files, no babysitting — you install it once and let compounding do
        what it does to a balance left alone.
      </p>
    </>
  ),
  cenith: (
    <>
      <p>
        Cenith is built around what it <em className="text-ink">refuses</em> to lose. Its
        exhaustion-filter grid waits for a move to run out of breath before it commits —
        and on GBPUSD's M5, where impatience gets punished fastest, that restraint is the
        whole edge.
      </p>
      <p>
        Across 5,857 backtested trades it held maximum drawdown to 25.79%. The return came
        second, and on purpose: protect the capital first, and the rest takes care of
        itself.
      </p>
    </>
  ),
  golden: (
    <>
      <p>
        Gold doesn't trend. It <em className="text-ink">detonates</em> — an NFP print, an
        FOMC sentence that moves the metal a hundred dollars before you've finished reading
        it. Most systems get torn apart by exactly that. Golden is engineered for it.
      </p>
      <p>
        Independent Basket Trailing lets every position manage its own exit, so the
        strategy survives the chaos gold makes its home rather than betting against it. It
        needs set files — two, one per timeframe — because taming this market was never
        going to be plug-and-play.
      </p>
    </>
  ),
}

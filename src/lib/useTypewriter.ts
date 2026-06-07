import { useEffect, useRef, useState } from 'react'

/** Reveals `text` character-by-character once `start` is true.
 *  Respects prefers-reduced-motion (renders the full string instantly). */
export function useTypewriter(text: string, speed = 16, start = true): string {
  const [out, setOut] = useState('')
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!start) {
      setOut('')
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setOut(text)
      return
    }
    setOut('')
    let i = 0
    let last = performance.now()
    const tick = (now: number) => {
      if (now - last >= speed) {
        i += 1
        setOut(text.slice(0, i))
        last = now
      }
      if (i < text.length) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [text, speed, start])

  return out
}

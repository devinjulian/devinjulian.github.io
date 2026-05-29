import { useEffect, useState } from 'react'

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** Gate the live WebGL hero. Off for reduced-motion, touch/mobile, low-memory,
 *  or no-WebGL devices — they get the static poster instead (PRD §5.2). */
export function useEnable3D(): boolean {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const lowMemory = typeof memory === 'number' && memory < 4

    setEnabled(hasWebGL() && !reduced && !coarse && !lowMemory)
  }, [])

  return enabled
}

import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { ContactProvider } from './ContactContext'
import { AmbientCanvas } from './AmbientCanvas'
import { Nav } from './Nav'
import { Footer } from './Footer'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    // Element may mount the same frame the route changes — wait one frame.
    const raf = requestAnimationFrame(() => {
      if (hash) {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -96 })
          else el.scrollIntoView({ block: 'start' })
          return
        }
      }
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, lenis])
  return null
}

export function Layout() {
  return (
    <ContactProvider>
      <a
        href="#main"
        className="sr-only rounded bg-gold px-4 py-2 font-mono text-xs text-void focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[110]"
      >
        Skip to content
      </a>
      <div aria-hidden className="atmosphere" />
      <AmbientCanvas />
      <div aria-hidden className="grain" />
      <ScrollManager />
      <Nav />
      <main id="main">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </ContactProvider>
  )
}

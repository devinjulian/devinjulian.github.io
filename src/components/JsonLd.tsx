import { useEffect } from 'react'

/** Injects a JSON-LD <script> into <head> for the current route; removes on unmount.
 *  Client-side — Google reads it when it renders the page. */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data)
  useEffect(() => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-jsonld', '')
    s.textContent = json
    document.head.appendChild(s)
    return () => {
      s.remove()
    }
  }, [json])
  return null
}

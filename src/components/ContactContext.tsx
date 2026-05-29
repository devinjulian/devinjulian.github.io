import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { ContactPanel } from './ContactPanel'

interface ContactValue {
  /** Open the contact panel, optionally naming the bundle/EA the visitor wants. */
  openContact: (item?: string) => void
}

const Ctx = createContext<ContactValue | null>(null)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState<string | undefined>(undefined)

  const openContact = useCallback((next?: string) => {
    setItem(next)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  return (
    <Ctx.Provider value={{ openContact }}>
      {children}
      <ContactPanel open={open} item={item} onClose={close} />
    </Ctx.Provider>
  )
}

export function useContact(): ContactValue {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useContact must be used within a ContactProvider')
  return ctx
}

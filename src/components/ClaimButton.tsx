import type { ReactNode } from 'react'
import { Button } from './Button'
import { useContact } from './ContactContext'

/** Primary conversion CTA. Opens the contact panel pre-filled with `item`. */
export function ClaimButton({
  item,
  children = 'Claim a Spot',
  variant = 'primary',
  size = 'md',
  className,
}: {
  item?: string
  children?: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md'
  className?: string
}) {
  const { openContact } = useContact()
  return (
    <Button variant={variant} size={size} className={className} onClick={() => openContact(item)}>
      {children}
    </Button>
  )
}

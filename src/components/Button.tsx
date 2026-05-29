import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'ghost'
type Size = 'sm' | 'md'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

interface LinkProps extends BaseProps {
  to: string
  href?: never
  onClick?: never
}
interface AnchorProps extends BaseProps {
  href: string
  external?: boolean
  to?: never
  onClick?: never
}
interface ActionProps extends BaseProps {
  onClick: () => void
  to?: never
  href?: never
}

type ButtonProps = LinkProps | AnchorProps | ActionProps

const STYLES: Record<Variant, string> = {
  primary: 'bg-gold text-void hover:bg-gold-deep',
  ghost: 'border border-ink/15 text-ink hover:border-gold/60 hover:text-gold',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-[0.7rem]',
  md: 'px-5 py-2.5 text-xs',
}

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-mono uppercase tracking-[0.15em]',
    'transition-colors duration-200 select-none',
    STYLES[variant],
    SIZES[size],
    className,
  )
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = classesFor(variant, size, className)

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    const external = props.external ?? props.href.startsWith('http')
    return (
      <a
        href={props.href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {children}
    </button>
  )
}

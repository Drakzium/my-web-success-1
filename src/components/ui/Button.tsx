import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type Variant = 'primary' | 'secondary' | 'ghost'

type Common = {
  children: ReactNode
  variant?: Variant
  className?: string
  showArrow?: boolean
}

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

function ArrowIcon() {
  return (
    <span className="btn__arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path
          d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  showArrow = true,
  ...props
}: ButtonProps) {
  const resolved = variant === 'ghost' ? 'secondary' : variant
  const classes = `btn btn-${resolved} ${className}`.trim()

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink
    return (
      <a href={href} className={classes} data-cursor="button" {...rest}>
        <span className="btn__label">{children}</span>
        {showArrow ? <ArrowIcon /> : null}
      </a>
    )
  }

  return (
    <button
      className={classes}
      data-cursor="button"
      {...(props as ButtonAsButton)}
    >
      <span className="btn__label">{children}</span>
      {showArrow ? <ArrowIcon /> : null}
    </button>
  )
}

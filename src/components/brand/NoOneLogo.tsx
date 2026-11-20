import './NoOneLogo.css'

export type LogoVariant = 'nav' | 'hero' | 'compact'

type NoOneLogoProps = {
  variant?: LogoVariant
  className?: string
  animated?: boolean
  idPrefix?: string
}

const LETTERS = ['N', 'O', 'O', 'N', 'E', '.'] as const

export function NoOneLogo({
  variant = 'nav',
  className = '',
  animated = false,
  idPrefix = 'logo',
}: NoOneLogoProps) {
  const classes = [
    'no-one-logo',
    `no-one-logo--${variant}`,
    animated ? 'no-one-logo--animated' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} aria-label="NO ONE." role="img">
      <div className="no-one-logo__emblem" data-logo-part="emblem">
        <svg
          className="no-one-logo__emblem-svg"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g data-logo-frag="frame">
            <path
              d="M24 3.5 42.5 14.2v19.6L24 44.5 5.5 33.8V14.2L24 3.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              className="no-one-logo__stroke-muted"
            />
          </g>
          <g data-logo-frag="core">
            <path
              d="M24 12.5 34.5 18.6v10.8L24 35.5 13.5 29.4V18.6L24 12.5Z"
              fill="var(--accent)"
              opacity="0.14"
            />
            <path
              d="M24 12.5 34.5 18.6v10.8L24 35.5 13.5 29.4V18.6L24 12.5Z"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
          </g>
          <g data-logo-frag="slash-a">
            <path
              d="M17.5 20.2 30.5 27.8"
              stroke="#f5f5f5"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
          <g data-logo-frag="slash-b">
            <path
              d="M17.8 28.2 30.2 20"
              stroke="var(--accent)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>
          <g data-logo-frag="node">
            <circle cx="24" cy="24" r="2.35" fill="var(--accent)" />
          </g>
        </svg>
      </div>

      <div className="no-one-logo__wordmark" data-logo-part="wordmark">
        {LETTERS.map((letter, index) => {
          const gapBefore = index === 2
          return (
            <span
              key={`${idPrefix}-${letter}-${index}`}
              className={`no-one-logo__letter${gapBefore ? ' no-one-logo__letter--gap' : ''}${
                letter === '.' ? ' no-one-logo__letter--dot' : ''
              }`}
              data-logo-letter={letter}
              data-logo-index={index}
              aria-hidden="true"
            >
              {letter}
            </span>
          )
        })}
      </div>

      {animated ? (
        <div className="no-one-logo__particles" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={`${idPrefix}-p-${i}`}
              className="no-one-logo__particle"
              data-logo-particle={i}
            />
          ))}
        </div>
      ) : null}

      <span className="no-one-logo__glow" aria-hidden="true" />
    </div>
  )
}

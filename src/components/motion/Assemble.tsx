import {
  createElement,
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { useScrollAssemble } from '../../hooks/useScrollAssemble'
import type { AssembleKind } from '../../animation/assembleConfig'
import './Assemble.css'

type AssembleProps = {
  kind?: AssembleKind
  as?: ElementType
  className?: string
  children: ReactNode
  splitWords?: boolean
  shards?: boolean
  shardCount?: number
  stagger?: number
  disabled?: boolean
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'style' | 'className'>

function splitToWords(text: string): string[] {
  return text.split(/(\s+)/).filter((part) => part.length > 0)
}

function WordPieces({ text }: { text: string }) {
  const parts = useMemo(() => splitToWords(text), [text])
  return (
    <>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={`s-${i}`}>{part}</span>
        ) : (
          <span key={`w-${i}`} className="assemble-word" data-assemble-piece>
            {part}
          </span>
        ),
      )}
    </>
  )
}

export function Assemble({
  kind = 'card',
  as = 'div',
  className = '',
  children,
  splitWords = false,
  shards = false,
  shardCount = 4,
  stagger,
  disabled,
  style,
  ...rest
}: AssembleProps) {
  const ref = useRef<HTMLElement | null>(null)
  useScrollAssemble(ref, { kind, stagger, disabled })

  const classes = [
    'assemble',
    `assemble--${kind}`,
    shards ? 'assemble--shards' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content =
    splitWords && typeof children === 'string' ? (
      <WordPieces text={children} />
    ) : (
      children
    )

  const shardNodes = shards
    ? Array.from({ length: shardCount }, (_, i) => (
        <span
          key={`shard-${i}`}
          className={`assemble-shard assemble-shard--${i % 4}`}
          data-assemble-shard
          aria-hidden="true"
        />
      ))
    : null

  return createElement(
    as,
    {
      ref,
      className: classes,
      'data-assemble': kind,
      style,
      ...rest,
    },
    createElement(
      'span',
      { className: 'assemble__motion', 'data-assemble-motion': '' },
      shardNodes,
      content,
    ),
  )
}

export function AssembleHeading({
  as = 'h2',
  className = '',
  children,
}: {
  as?: ElementType
  className?: string
  children: string
}) {
  return (
    <Assemble kind="heading" as={as} className={className} splitWords>
      {children}
    </Assemble>
  )
}

export function AssembleText({
  as = 'p',
  className = '',
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return (
    <Assemble kind="text" as={as} className={className}>
      {children}
    </Assemble>
  )
}

import { isMobileViewport } from '../utils/device'

export type AssembleKind =
  | 'heading'
  | 'text'
  | 'card'
  | 'visual'
  | 'button'
  | 'timeline'
  | 'node'

/** Deterministic fragment offsets — never randomized during scroll */
export function fragmentOffset(index: number, kind: AssembleKind) {
  const mobile = isMobileViewport()
  const mult = mobile ? 0.55 : 1

  const patterns: Record<AssembleKind, Array<{ x: number; y: number; rotate: number; scale: number }>> = {
    heading: [
      { x: -48, y: 36, rotate: -8, scale: 0.94 },
      { x: 32, y: -28, rotate: 6, scale: 0.96 },
      { x: -20, y: 44, rotate: 5, scale: 0.93 },
      { x: 40, y: 22, rotate: -7, scale: 0.95 },
      { x: -36, y: -18, rotate: 4, scale: 0.97 },
      { x: 24, y: 40, rotate: -5, scale: 0.94 },
    ],
    text: [
      { x: -24, y: 28, rotate: -3, scale: 0.98 },
      { x: 18, y: -16, rotate: 2, scale: 0.98 },
      { x: -12, y: 22, rotate: 2, scale: 0.99 },
    ],
    card: [
      { x: -56, y: 48, rotate: -7, scale: 0.9 },
      { x: 48, y: -36, rotate: 6, scale: 0.92 },
      { x: -28, y: -44, rotate: 5, scale: 0.91 },
      { x: 40, y: 40, rotate: -5, scale: 0.93 },
    ],
    visual: [
      { x: -40, y: 30, rotate: -5, scale: 0.94 },
      { x: 36, y: -28, rotate: 4, scale: 0.95 },
      { x: 0, y: 42, rotate: 3, scale: 0.93 },
      { x: -24, y: -34, rotate: -4, scale: 0.96 },
    ],
    button: [
      { x: -16, y: 14, rotate: -2, scale: 0.96 },
    ],
    timeline: [
      { x: -30, y: 24, rotate: -4, scale: 0.94 },
      { x: 28, y: -18, rotate: 3, scale: 0.95 },
    ],
    node: [
      { x: 0, y: 28, rotate: 0, scale: 0.9 },
    ],
  }

  const list = patterns[kind]
  const base = list[index % list.length]
  return {
    x: base.x * mult,
    y: base.y * mult,
    rotate: mobile ? base.rotate * 0.5 : base.rotate,
    scale: base.scale,
  }
}

export function scrubRange(kind: AssembleKind) {
  switch (kind) {
    case 'heading':
      return { start: 'top 92%', end: 'top 48%', scrub: 0.75 }
    case 'text':
      return { start: 'top 95%', end: 'top 62%', scrub: 0.7 }
    case 'card':
      return { start: 'top 94%', end: 'top 42%', scrub: 0.8 }
    case 'visual':
      return { start: 'top 92%', end: 'top 45%', scrub: 0.85 }
    case 'button':
      return { start: 'top 96%', end: 'top 70%', scrub: 0.55 }
    case 'timeline':
      return { start: 'top 90%', end: 'top 40%', scrub: 0.8 }
    case 'node':
      return { start: 'top 92%', end: 'top 55%', scrub: 0.7 }
    default:
      return { start: 'top 92%', end: 'top 50%', scrub: 0.75 }
  }
}

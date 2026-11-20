import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  fragmentOffset,
  scrubRange,
  type AssembleKind,
} from '../animation/assembleConfig'
import { isMobileViewport, prefersReducedMotion } from '../utils/device'

gsap.registerPlugin(ScrollTrigger)

type Options = {
  kind: AssembleKind
  stagger?: number
  disabled?: boolean
}

/**
 * Scrub-controlled assemble/disassemble tied to scroll progress.
 * progress 0 = fragmented, progress 1 = fully assembled.
 * Transforms are applied to an inner motion node (or pieces),
 * never the trigger root — avoids ScrollTrigger feedback loops.
 */
export function useScrollAssemble(
  ref: RefObject<HTMLElement | null>,
  { kind, stagger, disabled }: Options,
) {
  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return

    const motion =
      el.querySelector<HTMLElement>('[data-assemble-motion]') ?? el

    if (prefersReducedMotion()) {
      el.dataset.assembleState = 'static'
      gsap.set([el, motion], { clearProps: 'all' })
      el.querySelectorAll<HTMLElement>('[data-assemble-piece]').forEach((piece) => {
        gsap.set(piece, { clearProps: 'all' })
      })
      return
    }

    el.dataset.assembleState = 'ready'
    const mobile = isMobileViewport()
    const range = scrubRange(kind)
    const pieces = Array.from(
      motion.querySelectorAll<HTMLElement>(':scope > [data-assemble-piece], :scope [data-assemble-piece]'),
    ).filter((piece) => piece.closest('[data-assemble]') === el)
    const shards = Array.from(
      motion.querySelectorAll<HTMLElement>('[data-assemble-shard]'),
    ).filter((shard) => shard.closest('[data-assemble]') === el)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: range.start,
          end: range.end,
          scrub: range.scrub,
          invalidateOnRefresh: true,
        },
      })

      if (pieces.length > 0) {
        const step =
          stagger ?? (kind === 'heading' ? 0.04 : kind === 'text' ? 0.03 : 0.05)
        pieces.forEach((piece, i) => {
          const off = fragmentOffset(i, kind)
          gsap.set(piece, {
            x: off.x,
            y: off.y,
            rotation: off.rotate,
            scale: off.scale,
            opacity: kind === 'text' ? 0.2 : 0,
            transformOrigin: '50% 50%',
            force3D: true,
          })
          tl.to(
            piece,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 0.6,
            },
            i * step,
          )
        })
      } else {
        const off = fragmentOffset(0, kind)
        gsap.set(motion, {
          x: off.x,
          y: off.y,
          rotationX: mobile || kind === 'button' || kind === 'text' ? 0 : 8,
          rotationY: mobile || kind === 'button' ? 0 : -5,
          rotation: off.rotate,
          scale: off.scale,
          opacity: 0,
          filter: kind === 'card' || kind === 'visual' ? 'blur(3px)' : 'blur(0px)',
          transformPerspective: 900,
          transformOrigin: '50% 50%',
          force3D: true,
        })
        tl.to(motion, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
        })
      }

      if (shards.length > 0) {
        shards.forEach((shard, i) => {
          const off = fragmentOffset(i + 2, kind === 'visual' ? 'visual' : 'card')
          gsap.set(shard, {
            x: off.x * 1.35,
            y: off.y * 1.35,
            rotation: off.rotate * 2,
            opacity: 0.5,
            scale: 1.04,
          })
          tl.to(
            shard,
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 0,
              scale: 1,
              duration: 0.65,
            },
            0.06 + i * 0.04,
          )
        })
      }
    }, el)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    // Refresh after layout settles
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [ref, kind, stagger, disabled])
}

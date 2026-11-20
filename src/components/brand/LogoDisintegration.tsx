import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isMobileViewport, prefersReducedMotion } from '../../utils/device'
import { NoOneLogo } from './NoOneLogo'
import './LogoDisintegration.css'

gsap.registerPlugin(ScrollTrigger)

/** Stable end-state transforms — never regenerated during scroll */
const LETTER_END = [
  { x: -72, y: -48, z: -80, rotateX: -28, rotateY: 36, rotateZ: -18, scale: 0.72 },
  { x: -28, y: 56, z: -40, rotateX: 22, rotateY: -24, rotateZ: 14, scale: 0.78 },
  { x: 18, y: -62, z: 30, rotateX: -18, rotateY: 42, rotateZ: -10, scale: 0.7 },
  { x: 64, y: 38, z: -55, rotateX: 30, rotateY: -32, rotateZ: 22, scale: 0.74 },
  { x: 96, y: -28, z: 20, rotateX: -24, rotateY: 18, rotateZ: -28, scale: 0.68 },
  { x: 118, y: 52, z: -25, rotateX: 16, rotateY: -40, rotateZ: 34, scale: 0.62 },
] as const

const FRAG_END = [
  { x: -40, y: -36, rotate: -28, scale: 0.85 },
  { x: 34, y: -42, rotate: 22, scale: 0.8 },
  { x: -48, y: 28, rotate: 18, scale: 0.75 },
  { x: 42, y: 34, rotate: -34, scale: 0.7 },
  { x: 8, y: -52, rotate: 12, scale: 0.9 },
] as const

const PARTICLE_END = [
  { x: -90, y: -60 },
  { x: -40, y: 70 },
  { x: 30, y: -80 },
  { x: 80, y: 50 },
  { x: 110, y: -30 },
  { x: -70, y: 20 },
  { x: 50, y: 90 },
  { x: -20, y: -95 },
] as const

type LogoDisintegrationProps = {
  triggerRef?: RefObject<HTMLElement | null>
}

export function LogoDisintegration({ triggerRef }: LogoDisintegrationProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (prefersReducedMotion()) {
      root.dataset.state = 'static'
      return
    }

    const trigger = triggerRef?.current ?? root.closest('section') ?? root
    const mobile = isMobileViewport()
    const letters = Array.from(
      root.querySelectorAll<HTMLElement>('[data-logo-letter]'),
    )
    const frags = Array.from(
      root.querySelectorAll<SVGElement>('[data-logo-frag]'),
    )
    const particles = Array.from(
      root.querySelectorAll<HTMLElement>('[data-logo-particle]'),
    )
    const glow = root.querySelector<HTMLElement>('.no-one-logo__glow')
    const emblem = root.querySelector<HTMLElement>('[data-logo-part="emblem"]')

    // Mobile: animate fewer fragments while keeping the same effect
    const activeLetters = mobile ? letters.filter((_, i) => i % 2 === 0 || i === letters.length - 1) : letters
    const activeFrags = mobile ? frags.slice(0, 3) : frags
    const activeParticles = mobile ? particles.slice(0, 4) : particles

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom top+=15%',
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      })

      activeLetters.forEach((el, i) => {
        const end = LETTER_END[i % LETTER_END.length]
        const mult = mobile ? 0.55 : 1
        tl.to(
          el,
          {
            x: end.x * mult,
            y: end.y * mult,
            z: end.z * (mobile ? 0.4 : 1),
            rotateX: end.rotateX,
            rotateY: end.rotateY,
            rotateZ: end.rotateZ,
            scale: end.scale,
            opacity: mobile ? 0.35 : 0.2,
            force3D: true,
            transformPerspective: 900,
          },
          0,
        )
      })

      // Letters not actively fragmented still fade slightly for cohesion
      if (mobile) {
        letters.forEach((el) => {
          if (activeLetters.includes(el)) return
          tl.to(el, { opacity: 0.45, y: 12, rotateZ: 6, scale: 0.92 }, 0)
        })
      }

      activeFrags.forEach((el, i) => {
        const end = FRAG_END[i % FRAG_END.length]
        const mult = mobile ? 0.5 : 1
        tl.to(
          el,
          {
            x: end.x * mult,
            y: end.y * mult,
            rotation: end.rotate,
            scale: end.scale,
            opacity: 0.25,
            transformOrigin: '50% 50%',
          },
          0,
        )
      })

      if (emblem) {
        tl.to(
          emblem,
          {
            rotateY: mobile ? 18 : 42,
            rotateX: mobile ? -8 : -16,
            z: mobile ? -20 : -60,
            scale: 0.88,
          },
          0,
        )
      }

      activeParticles.forEach((el, i) => {
        const end = PARTICLE_END[i % PARTICLE_END.length]
        const mult = mobile ? 0.6 : 1
        tl.fromTo(
          el,
          { opacity: 0, x: 0, y: 0, scale: 0.4 },
          {
            opacity: 0.85,
            x: end.x * mult,
            y: end.y * mult,
            scale: 1,
            duration: 0.45,
          },
          0.08,
        )
        tl.to(
          el,
          {
            opacity: 0,
            x: end.x * mult * 1.35,
            y: end.y * mult * 1.35,
            scale: 0.2,
            duration: 0.55,
          },
          0.5,
        )
      })

      if (glow) {
        tl.to(glow, { opacity: 0.15, scale: 1.35 }, 0)
      }

      tl.to(
        root,
        {
          y: mobile ? -12 : -28,
          opacity: 0.92,
        },
        0,
      )
    }, root)

    return () => {
      ctx.revert()
    }
  }, [triggerRef])

  return (
    <div ref={rootRef} className="logo-disintegration" data-state="ready">
      <NoOneLogo variant="hero" animated idPrefix="hero-logo" />
    </div>
  )
}

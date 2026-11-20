import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../components/ui/Button'
import { LogoDisintegration } from '../components/brand/LogoDisintegration'
import { prefersReducedMotion } from '../utils/device'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const HeroScene = lazy(() =>
  import('../scenes/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !titleRef.current) return

    const chars = titleRef.current.querySelectorAll('.hero__char')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          stagger: 0.035,
          ease: 'power3.out',
          delay: 0.15,
        },
      )
    })

    return () => ctx.revert()
  }, [])

  // Soft parallax for copy so logo disintegration + 3D read as one sequence
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const lines = ['BEYOND', 'ORDINARY.']

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <Suspense fallback={<div className="hero-scene hero-scene--loading" aria-hidden="true" />}>
        <HeroScene />
      </Suspense>
      <div className="hero__veil" aria-hidden="true" />

      <div className="container hero__content" ref={contentRef}>
        <motion.div
          className="hero__status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="status-dot" aria-hidden="true" />
          <span>Studio online — building the extraordinary</span>
        </motion.div>

        <motion.div
          className="hero__logo"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.65 }}
        >
          <LogoDisintegration triggerRef={sectionRef} />
        </motion.div>

        <h1 ref={titleRef} className="hero__title" aria-label="Beyond ordinary.">
          {lines.map((line) => (
            <span key={line} className="hero__line">
              {line.split('').map((char, i) => (
                <span key={`${line}-${char}-${i}`} className="hero__char-wrap">
                  <span className="hero__char">{char}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          We build interactive digital experiences, intelligent systems and
          technology-driven solutions.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <Button href="#projects" variant="primary">
            Explore Projects
          </Button>
          <Button href="#contact" variant="secondary">
            Let&apos;s Connect
          </Button>
        </motion.div>
      </div>

      <a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to about"
        data-cursor="link"
      >
        <span>Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}

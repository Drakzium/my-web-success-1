import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../utils/device'
import './CustomCursor.css'

type CursorMode = 'default' | 'button' | 'view' | 'link'

function supportsCustomCursor(): boolean {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  if (!window.matchMedia('(pointer: fine)').matches) return false
  if (window.matchMedia('(hover: none)').matches) return false
  return true
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const mode = useRef<CursorMode>('default')
  const pressed = useRef(false)
  const visible = useRef(false)
  const raf = useRef(0)

  useEffect(() => {
    const evaluate = () => setEnabled(supportsCustomCursor())
    evaluate()

    const fine = window.matchMedia('(pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    fine.addEventListener('change', evaluate)
    motion.addEventListener('change', evaluate)
    return () => {
      fine.removeEventListener('change', evaluate)
      motion.removeEventListener('change', evaluate)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }

    document.documentElement.classList.add('has-custom-cursor')

    const resolveMode = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) return 'default'
      const hit = target.closest<HTMLElement>('[data-cursor]')
      const value = hit?.dataset.cursor
      if (value === 'button' || value === 'view' || value === 'link') return value
      if (target.closest('button, a, [role="button"], input, textarea, summary')) {
        return 'link'
      }
      return 'default'
    }

    const applyModeClass = () => {
      const root = rootRef.current
      if (!root) return
      root.dataset.mode = mode.current
      root.dataset.pressed = pressed.current ? 'true' : 'false'
      root.dataset.visible = visible.current ? 'true' : 'false'
      if (labelRef.current) {
        labelRef.current.textContent = mode.current === 'view' ? 'VIEW' : ''
      }
    }

    const onMove = (event: PointerEvent) => {
      pos.current.x = event.clientX
      pos.current.y = event.clientY
      visible.current = true
      const next = resolveMode(event.target)
      if (next !== mode.current) {
        mode.current = next
        applyModeClass()
      }
    }

    const onDown = () => {
      pressed.current = true
      applyModeClass()
    }

    const onUp = () => {
      pressed.current = false
      applyModeClass()
    }

    const onLeave = () => {
      visible.current = false
      applyModeClass()
    }

    const onEnter = () => {
      visible.current = true
      applyModeClass()
    }

    const tick = () => {
      const ease = 0.18
      ring.current.x += (pos.current.x - ring.current.x) * ease
      ring.current.y += (pos.current.y - ring.current.y) * ease

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }

      raf.current = window.requestAnimationFrame(tick)
    }

    applyModeClass()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf.current = window.requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.cancelAnimationFrame(raf.current)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={rootRef}
      className="custom-cursor"
      aria-hidden="true"
      data-mode="default"
      data-pressed="false"
      data-visible="false"
    >
      <div ref={ringRef} className="custom-cursor__ring">
        <span ref={labelRef} className="custom-cursor__label" />
      </div>
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  )
}

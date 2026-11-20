import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { NoOneLogo } from '../brand/NoOneLogo'
import { Button } from '../ui/Button'
import './Navigation.css'

export function Navigation() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a
          href="#home"
          className="nav__brand"
          data-cursor="link"
          onClick={close}
          aria-label="NO ONE. — Home"
        >
          <NoOneLogo variant="nav" idPrefix="nav-logo" />
        </a>

        <nav className="nav__desktop" aria-label="Primary">
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  data-cursor="link"
                  className={`nav__link ${active === item.id ? 'is-active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button href="#contact" className="nav__cta" showArrow>
          Let&apos;s Talk
        </Button>

        <button
          type="button"
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-cursor="button"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="nav__mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              aria-label="Mobile"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <a
                      href={item.href}
                      data-cursor="link"
                      className={active === item.id ? 'is-active' : ''}
                      onClick={close}
                    >
                      <span className="nav__mobile-index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <Button href="#contact" onClick={close}>
                Let&apos;s Talk
              </Button>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

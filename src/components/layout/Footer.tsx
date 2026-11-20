import { navItems } from '../../data/navigation'
import { EMAIL, WHATSAPP } from '../../data/contact'
import { NoOneLogo } from '../brand/NoOneLogo'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <NoOneLogo variant="compact" idPrefix="footer-logo" />
          <p className="footer__tag">Beyond ordinary.</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {navItems.map((item) => (
            <a key={item.id} href={item.href} data-cursor="link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__meta">
          <div className="footer__contacts">
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact"
              data-cursor="button"
            >
              WhatsApp
            </a>
            <a href={EMAIL.href} className="footer__contact" data-cursor="button">
              Email
            </a>
          </div>
          <p className="footer__copy">© {year} No One Labs</p>
        </div>
      </div>
    </footer>
  )
}

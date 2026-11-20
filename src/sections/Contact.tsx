import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { Assemble } from '../components/motion/Assemble'
import { EMAIL, WHATSAPP } from '../data/contact'
import './Contact.css'

function WhatsAppIcon() {
  return (
    <svg className="contact-card__icon-svg" viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.01 3C9.4 3 4 8.3 4 14.8c0 2.1.56 4.1 1.62 5.9L4 29l8.55-2.24A12.2 12.2 0 0 0 16 26.6c6.62 0 12-5.3 12-11.8S22.63 3 16.01 3Zm0 21.5c-1.2 0-2.38-.3-3.42-.88l-.24-.13-5.07 1.33 1.35-4.94-.16-.26A9.4 9.4 0 0 1 6.6 14.8c0-5.1 4.24-9.25 9.4-9.25 5.18 0 9.4 4.15 9.4 9.25 0 5.1-4.22 9.2-9.4 9.2Zm5.16-6.92c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.63.14-.19.28-.73.91-.9 1.1-.16.18-.33.21-.61.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.4-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.18.05-.35-.02-.5-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.03 2.82 1.17 3.01c.14.19 2.02 3.08 4.9 4.32 1.85.8 2.37.8 3.23.67.52-.08 1.67-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.54-.33Z"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="contact-card__icon-svg" viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        d="M5 9.5h22v13H5z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M5.5 10.2 16 17.5 26.5 10.2"
      />
    </svg>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          title="LET'S BUILD SOMETHING EXTRAORDINARY."
          lead="Reach out directly by WhatsApp or email to discuss projects, experiments or collaboration."
        />

        <div className="contact__grid">
          <Assemble
            kind="card"
            as="article"
            className="contact-card contact-card--whatsapp"
            shards
            shardCount={3}
          >
            <div className="contact-card__icon" aria-hidden="true">
              <WhatsAppIcon />
            </div>
            <h3>MESSAGE ON WHATSAPP</h3>
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card__value"
              data-cursor="link"
            >
              {WHATSAPP.display}
            </a>
            <p>
              Prefer a quick conversation? Message on WhatsApp for project
              discussions, timelines and collaboration.
            </p>
            <div className="contact-card__action">
              <Button
                href={WHATSAPP.href}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open WhatsApp
              </Button>
            </div>
            <p className="contact-card__meta">{WHATSAPP.international}</p>
          </Assemble>

          <Assemble
            kind="card"
            as="article"
            className="contact-card contact-card--email"
            shards
            shardCount={3}
          >
            <div className="contact-card__icon" aria-hidden="true">
              <EmailIcon />
            </div>
            <h3>SEND AN EMAIL</h3>
            <a
              href={EMAIL.href}
              className="contact-card__value"
              data-cursor="link"
            >
              {EMAIL.display}
            </a>
            <p>
              Send a detailed brief, references or technical requirements —
              email is ideal for longer project notes.
            </p>
            <div className="contact-card__action">
              <Button href={EMAIL.href} variant="secondary">
                Send Email
              </Button>
            </div>
          </Assemble>
        </div>
      </div>
    </section>
  )
}

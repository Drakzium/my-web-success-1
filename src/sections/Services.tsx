import { SectionHeader } from '../components/ui/SectionHeader'
import { Assemble } from '../components/motion/Assemble'
import { services } from '../data/services'
import './Services.css'

const icons = [
  <svg key="r" viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 28 L20 12 L28 28" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="d" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M12 20h16M20 12v16" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="w" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 12h24v16H8z" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16h24" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="a" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 8l10 18H10L20 8z" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="20" cy="22" r="2" fill="currentColor"/></svg>,
  <svg key="f" viewBox="0 0 40 40" aria-hidden="true"><path d="M10 28V12h8l4 6 4-6h4v16" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="c" viewBox="0 0 40 40" aria-hidden="true"><rect x="10" y="10" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M16 20h8M20 16v8" stroke="currentColor" strokeWidth="1.5"/></svg>,
]

export function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="WHAT WE CAN BUILD."
          lead="Focused development work across interactive systems, bots, web interfaces and intelligent tooling — scoped to what can actually be delivered."
        />

        <div className="services__grid">
          {services.map((service, index) => (
            <Assemble
              key={service.id}
              kind="card"
              as="article"
              className="service-card"
              shards
              shardCount={3}
              data-cursor="view"
            >
              <div className="service-card__icon" data-assemble-piece>
                {icons[index]}
              </div>
              <h3 data-assemble-piece>{service.title}</h3>
              <p data-assemble-piece>{service.description}</p>
              <ul data-assemble-piece>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="service-card__cta"
                data-cursor="button"
                data-assemble-piece
              >
                Start a conversation
                <span className="btn__arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <path
                      d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Assemble>
          ))}
        </div>
      </div>
    </section>
  )
}

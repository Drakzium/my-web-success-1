import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Assemble } from '../components/motion/Assemble'
import { expertiseAreas } from '../data/expertise'
import './Expertise.css'

export function Expertise() {
  const [activeId, setActiveId] = useState(expertiseAreas[0].id)
  const active = expertiseAreas.find((a) => a.id === activeId) ?? expertiseAreas[0]

  return (
    <section id="expertise" className="section expertise">
      <div className="container">
        <SectionHeader
          eyebrow="Skills & Expertise"
          title="TECHNICAL FOCUS."
          lead="Areas of practice across interactive systems, automation, web interfaces and experimental AI — presented without inflated metrics or fabricated credentials."
        />

        <Assemble kind="card" className="expertise__layout">
          <ul className="expertise__tabs" role="tablist" aria-label="Expertise areas">
            {expertiseAreas.map((area) => (
              <li key={area.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeId === area.id}
                  className={`expertise__tab ${activeId === area.id ? 'is-active' : ''}`}
                  data-cursor="button"
                  onClick={() => setActiveId(area.id)}
                >
                  {area.title}
                </button>
              </li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              className="expertise__panel"
              role="tabpanel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="expertise__panel-visual" aria-hidden="true">
                <span className="expertise__signal" />
                <span className="expertise__signal" />
                <span className="expertise__signal" />
              </div>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <ul className="expertise__points">
                {active.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </Assemble>

        <div className="expertise__cards">
          {expertiseAreas.map((area, index) => (
            <Assemble
              key={area.id}
              kind="card"
              as="article"
              className="expertise__card"
              shards
              shardCount={3}
            >
              <span className="expertise__card-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </Assemble>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Assemble } from '../components/motion/Assemble'
import { processSteps } from '../data/process'
import './Process.css'

export function Process() {
  const [active, setActive] = useState(0)

  return (
    <section id="process" className="section process">
      <div className="container">
        <SectionHeader
          eyebrow="Process"
          title="FROM IDEA TO EXECUTION."
          lead="A clear path from discovery through delivery — interactive so you can explore each stage."
        />

        <Assemble kind="timeline" className="process__track" role="list">
          {processSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              role="listitem"
              className={`process__node ${active === index ? 'is-active' : ''}`}
              data-cursor="button"
              data-assemble-piece
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              aria-current={active === index ? 'step' : undefined}
            >
              <span className="process__number">{step.number}</span>
              <span className="process__title">{step.title}</span>
            </button>
          ))}
          <div className="process__line" aria-hidden="true" data-assemble-piece>
            <motion.div
              className="process__line-fill"
              animate={{
                width: `${(active / (processSteps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </Assemble>

        <Assemble kind="card" className="process__detail-shell">
          <motion.div
            key={processSteps[active].id}
            className="process__detail"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="process__detail-number">{processSteps[active].number}</p>
            <h3>{processSteps[active].title}</h3>
            <p>{processSteps[active].description}</p>
          </motion.div>
        </Assemble>
      </div>
    </section>
  )
}

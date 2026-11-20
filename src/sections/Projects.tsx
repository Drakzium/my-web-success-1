import { useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Button } from '../components/ui/Button'
import { Assemble } from '../components/motion/Assemble'
import { projects, type Project } from '../data/projects'
import './Projects.css'

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="project-visual"
      style={{ '--project-accent': project.accent } as CSSProperties}
      aria-hidden="true"
    >
      <div className="project-visual__grid" />
      <div className="project-visual__shape project-visual__shape--a" />
      <div className="project-visual__shape project-visual__shape--b" />
      <span className="project-visual__code">{project.id.toUpperCase()}</span>
    </div>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="SELECTED WORK & EXPERIMENTS."
          lead="Active development and experimental tracks. Status labels reflect current reality — not imagined launch metrics."
        />

        <div className="projects__list">
          {projects.map((project, index) => (
            <Assemble
              key={project.id}
              kind="card"
              as="article"
              className="project-card"
              shards
              shardCount={4}
              data-cursor="view"
            >
              <div className="project-card__visual-wrap" data-assemble-piece>
                <ProjectVisual project={project} />
              </div>
              <div className="project-card__body" data-assemble-piece>
                <div className="project-card__meta">
                  <span className="project-card__status">{project.status}</span>
                  <span className="project-card__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul className="project-card__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="project-card__link"
                  data-cursor="button"
                  onClick={() => setSelected(project)}
                >
                  View details
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
                </button>
              </div>
            </Assemble>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="project-modal__backdrop"
              aria-label="Close project details"
              data-cursor="link"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="project-modal__panel"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-modal__top">
                <span className="project-card__status">{selected.status}</span>
                <button
                  type="button"
                  className="project-modal__close"
                  data-cursor="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <ProjectVisual project={selected} />
              <h3 id="project-modal-title">{selected.title}</h3>
              <p>{selected.description}</p>
              <ul className="project-card__tags">
                {selected.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Button href="#contact" variant="primary" onClick={() => setSelected(null)}>
                Discuss this direction
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

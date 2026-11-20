import { SectionHeader } from '../components/ui/SectionHeader'
import { Assemble } from '../components/motion/Assemble'
import './About.css'

const pillars = [
  {
    title: 'Technical philosophy',
    text: 'Systems should be clear, intentional and built to evolve. Architecture comes before decoration.',
  },
  {
    title: 'Creative approach',
    text: 'Interaction, motion and visual language are treated as part of the product — not an afterthought.',
  },
  {
    title: 'Development mindset',
    text: 'Ship real functionality, keep experiments honest, and refine through iteration instead of overclaiming.',
  },
]

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__grid">
          <SectionHeader
            eyebrow="About"
            title="A DIFFERENT WAY TO BUILD."
            lead="No One Labs is a technology-focused creative studio working across software, automation, interactive experiences and AI experimentation."
          />

          <Assemble
            kind="visual"
            className="about__visual"
            shards
            shardCount={3}
            aria-hidden="true"
          >
            <div className="about__frame">
              <div className="about__orbit" />
              <div className="about__core" />
              <span className="about__label">INDEPENDENT STUDIO</span>
            </div>
          </Assemble>
        </div>

        <div className="about__pillars">
          {pillars.map((pillar, index) => (
            <Assemble key={pillar.title} kind="card" as="article" className="about__pillar">
              <span className="about__pillar-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </Assemble>
          ))}
        </div>
      </div>
    </section>
  )
}

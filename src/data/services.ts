export interface Service {
  id: string
  title: string
  description: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    id: 'roblox-systems',
    title: 'Custom Roblox Systems',
    description:
      'Gameplay scripting and system design for Roblox experiences — combat, progression, NPCs and interactive logic.',
    deliverables: [
      'Gameplay mechanics',
      'Progression frameworks',
      'NPC / quest logic',
      'Studio-ready scripts',
    ],
  },
  {
    id: 'discord-bots',
    title: 'Discord Bot Development',
    description:
      'Custom Discord bots with command systems, event handling and server automation tailored to your community.',
    deliverables: [
      'Command frameworks',
      'Event-driven automation',
      'API integrations',
      'Bot management tools',
    ],
  },
  {
    id: 'interactive-web',
    title: 'Interactive Website Development',
    description:
      'Modern React and TypeScript sites with strong visual identity, motion and responsive interfaces.',
    deliverables: [
      'Frontend architecture',
      'Responsive UI',
      'Motion & interaction',
      'Performance-minded builds',
    ],
  },
  {
    id: 'ai-assistants',
    title: 'AI Assistant Development',
    description:
      'Exploration and development of AI assistant concepts — local-first patterns, tools and intelligent workflows.',
    deliverables: [
      'Assistant prototypes',
      'Tool integration concepts',
      'Local AI architecture ideas',
      'Automation-oriented flows',
    ],
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description:
      'Practical automation experiments that connect tools, scripts and processes into clearer operational flows.',
    deliverables: [
      'Scripted workflows',
      'API-driven automation',
      'Process tooling',
      'Integration concepts',
    ],
  },
  {
    id: 'custom-software',
    title: 'Custom Software Concepts',
    description:
      'Technical concept work and early-stage software development when the problem needs a tailored approach.',
    deliverables: [
      'Technical discovery',
      'Architecture outlines',
      'Prototype development',
      'Iterative refinement',
    ],
  },
]

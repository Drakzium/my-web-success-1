export type ProjectStatus =
  | 'In Development'
  | 'Experimental Development'
  | 'Active Concepts'

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  status: ProjectStatus
  tags: string[]
  accent: string
}

export const projects: Project[] = [
  {
    id: 'fusion-desk',
    title: 'FUSION DESK',
    slug: 'fusion-desk',
    summary:
      'A local-first AI desktop assistant exploring desktop automation, intelligent interaction, secure companion connectivity and model integration.',
    description:
      'FUSION DESK investigates how a local AI companion can sit beside daily workflows — connecting models, tools and desktop actions without relying on cloud-only assumptions. The project focuses on architecture, interaction patterns and secure companion connectivity while remaining firmly in active development.',
    status: 'In Development',
    tags: ['AI', 'Desktop', 'Automation', 'Local-first', 'Python'],
    accent: '#39FF14',
  },
  {
    id: 'fusion-brain',
    title: 'FUSION BRAIN',
    slug: 'fusion-brain',
    summary:
      'An experimental original language-model project exploring tokenization, Transformer architecture, training and inference.',
    description:
      'FUSION BRAIN is an experimental R&D track into original language-model development — from tokenizer experiments and Transformer architecture studies through training loops, inference design and evaluation. Capabilities here are exploratory and not presented as production-ready products.',
    status: 'Experimental Development',
    tags: ['LLM', 'Transformers', 'Tokenizers', 'Research', 'Python'],
    accent: '#6BFF6B',
  },
  {
    id: 'discord-automation',
    title: 'DISCORD AUTOMATION',
    slug: 'discord-automation',
    summary:
      'Custom Discord bot development covering command systems, event handling and server automation concepts.',
    description:
      'Discord Automation covers custom bots built for command workflows, event-driven server logic and practical automation patterns. Work ranges from command frameworks to API integrations and bot management functionality tailored to each server’s needs.',
    status: 'Active Concepts',
    tags: ['Discord', 'Bots', 'Node.js', 'APIs', 'Automation'],
    accent: '#9AFF9A',
  },
  {
    id: 'roblox-systems',
    title: 'ROBLOX SYSTEMS',
    slug: 'roblox-systems',
    summary:
      'Gameplay scripting, progression mechanics, NPC systems, combat systems and interactive game development.',
    description:
      'Roblox Systems focuses on Lua-driven gameplay — combat mechanics, NPC and quest logic, progression loops and interactive game systems crafted inside Roblox Studio. Emphasis is on clear architecture and systems that feel responsive in play.',
    status: 'Active Concepts',
    tags: ['Roblox', 'Lua', 'Gameplay', 'NPCs', 'Combat'],
    accent: '#39FF14',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

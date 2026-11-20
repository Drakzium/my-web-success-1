export interface ExpertiseArea {
  id: string
  title: string
  description: string
  points: string[]
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: 'roblox',
    title: 'Roblox Development',
    description:
      'Lua-driven gameplay systems built in Roblox Studio — from combat loops to quest logic and progression.',
    points: [
      'Lua scripting',
      'Gameplay systems',
      'Combat mechanics',
      'NPC and quest systems',
      'Game progression systems',
      'Interactive game logic',
      'Roblox Studio development',
    ],
  },
  {
    id: 'discord',
    title: 'Discord Bot Development',
    description:
      'Custom bots for commands, events and server automation with practical API integrations.',
    points: [
      'Custom Discord bots',
      'Commands and event systems',
      'Server automation',
      'API integrations',
      'Bot management functionality',
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    description:
      'Interactive frontend experiences with React, TypeScript and modern responsive interfaces.',
    points: [
      'Interactive websites',
      'Frontend development',
      'React',
      'TypeScript',
      'Responsive interfaces',
      'Modern UI implementation',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Intelligent Systems',
    description:
      'Assistant concepts, automation ideas and local AI architecture — including RAG-oriented exploration.',
    points: [
      'AI assistant development',
      'AI-powered automation concepts',
      'Retrieval-Augmented Generation (RAG)',
      'Local AI architecture',
      'Tool-integrated assistant concepts',
    ],
  },
  {
    id: 'llm',
    title: 'LLM Research & Development',
    description:
      'Experimental work on transformers, tokenizers, training and inference — including FUSION BRAIN.',
    points: [
      'Transformer architecture experiments',
      'Tokenizer development',
      'Model training experiments',
      'Inference architecture',
      'Evaluation and benchmarking',
      'FUSION BRAIN experimental development',
    ],
  },
  {
    id: 'python',
    title: 'Python Development',
    description:
      'Python for automation experiments, AI foundations and application development practice.',
    points: [
      'Python programming',
      'Automation experiments',
      'AI development foundations',
      'Backend and application development practice',
    ],
  },
]

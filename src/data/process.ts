export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    description: 'Understand the idea and requirements.',
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Architecture',
    description: 'Design the structure and technical approach.',
  },
  {
    id: 'development',
    number: '03',
    title: 'Development',
    description: 'Build the actual functionality.',
  },
  {
    id: 'testing',
    number: '04',
    title: 'Testing',
    description: 'Identify and resolve problems.',
  },
  {
    id: 'delivery',
    number: '05',
    title: 'Delivery',
    description: 'Prepare and present the completed project.',
  },
]

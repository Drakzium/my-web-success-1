export interface NavItem {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'expertise', label: 'Expertise', href: '#expertise' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const DISCORD_INVITE = 'https://discord.gg/KskCySxM8f'

import { Assemble, AssembleHeading, AssembleText } from '../motion/Assemble'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  lead?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <header className={`section-header section-header--${align}`}>
      <Assemble kind="text" as="p" className="section-eyebrow">
        {eyebrow}
      </Assemble>
      <AssembleHeading as="h2" className="section-title">
        {title}
      </AssembleHeading>
      {lead ? (
        <AssembleText as="p" className="section-lead">
          {lead}
        </AssembleText>
      ) : null}
    </header>
  )
}

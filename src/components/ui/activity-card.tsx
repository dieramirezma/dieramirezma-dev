import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ActivityCardProps {
  icon: LucideIcon
  title: string
  href?: string
  linkLabel?: string
  children: React.ReactNode
}

export function ActivityCard({ icon: Icon, title, href, linkLabel, children }: ActivityCardProps) {
  return (
    <article className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h3 className="meta flex items-center gap-2 text-fg">
          <Icon size={14} aria-hidden="true" /> {title}
        </h3>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkLabel ? `${title} ${linkLabel}` : title}
            className="-m-2 p-2 text-subtle transition-colors hover:text-accent"
          >
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ) : null}
      </header>
      {children}
    </article>
  )
}

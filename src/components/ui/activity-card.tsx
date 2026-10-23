import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ActivityCardProps {
  icon: LucideIcon
  title: string
  href?: string
  children: React.ReactNode
}

export function ActivityCard({ icon: Icon, title, href, children }: ActivityCardProps) {
  return (
    <article className="flex flex-col gap-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 transition-colors hover:border-[var(--color-border-hover)]">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={15} className="text-[var(--color-primary)]" aria-hidden="true" />
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
            {title}
          </h3>
        </div>
        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={title}
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
          >
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        ) : null}
      </header>
      {children}
    </article>
  )
}

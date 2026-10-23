'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CloudCog, Code2, Database } from 'lucide-react'
import { SectionTitle } from '@/components/ui/section-title'
import { Chip } from '@/components/ui/chip'

const GROUPS = [
  {
    key: 'frontend',
    icon: Code2,
    stack: ['React', 'Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS'],
  },
  {
    key: 'fullstack',
    icon: Database,
    stack: ['Python', 'Django', 'FastAPI', 'Node.js', 'PostgreSQL', 'REST APIs'],
  },
  {
    key: 'quality',
    icon: CloudCog,
    stack: ['Vitest', 'GitHub Actions', 'AWS', 'Google Cloud', 'Docker'],
  },
] as const

export function Capabilities() {
  const t = useTranslations('capabilities')
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-24 mx-auto max-w-[1200px] px-5 py-20 sm:px-10"
    >
      <div className="mb-10 max-w-2xl">
        <SectionTitle id="capabilities-heading">{t('title')}</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {t('intro')}
        </p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-3">
        {GROUPS.map((group, index) => {
          const Icon = group.icon
          return (
            <motion.article
              key={group.key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-[var(--color-surface-1)] p-6 sm:p-8"
            >
              <Icon size={20} className="text-[var(--color-primary)]" aria-hidden="true" />
              <h3 className="mt-5 font-semibold text-[var(--color-text-primary)]">
                {t(group.key)}
              </h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {t(`${group.key}_desc`)}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.stack.map(tech => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

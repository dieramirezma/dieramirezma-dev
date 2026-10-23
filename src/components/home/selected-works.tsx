'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/section-title'
import { Chip } from '@/components/ui/chip'

const PROJECTS = [
  {
    title: 'Dulce Berlín',
    context: 'dulce_context',
    description: 'dulce_description',
    stack: ['Next.js', 'Django', 'PostgreSQL', 'Wompi'],
  },
  {
    title: 'FullStyle',
    context: 'fullstyle_context',
    description: 'fullstyle_description',
    stack: ['Next.js', 'TypeScript', 'Flask', 'PostgreSQL', 'Docker', 'Wompi'],
  },
  {
    title: 'gemalab_title',
    context: 'gemalab_context',
    description: 'gemalab_description',
    stack: ['Authentication', 'Secure data flow'],
    href: 'https://github.com/dieramirezma/hackathon-nacional-talento-tech',
  },
  {
    title: 'FoodRadar',
    context: 'foodradar_context',
    description: 'foodradar_description',
    stack: ['Android', 'Kotlin', 'OpenStreetMap', 'Gemini AI'],
  },
] as const

export function SelectedWorks() {
  const t = useTranslations('selectedWorks')
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 mx-auto max-w-[1200px] px-5 py-20 sm:px-10"
    >
      <div className="mb-10 max-w-2xl">
        <SectionTitle id="work-heading">{t('title')}</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {t('intro')}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.07 }}
            className="group flex min-h-[340px] flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 transition-colors hover:border-[var(--color-border-hover)]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-primary)]">
              {t(project.context)}
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              {project.title === 'gemalab_title' ? t(project.title) : project.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {t(project.description)}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-8">
              {project.stack.map(tech => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
            {'href' in project && project.href ? (
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 border-t border-[var(--color-border)] pt-4 font-mono text-[11px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                {t('repository')} <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            ) : null}
          </motion.article>
        ))}
      </div>
    </section>
  )
}

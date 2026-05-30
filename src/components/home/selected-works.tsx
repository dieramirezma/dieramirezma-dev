'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/section-title'
import { Chip } from '@/components/ui/chip'
import type { Project } from '@/types'

const PROJECTS: Project[] = [
  {
    slug: 'portfolio',
    title: 'dieramirezma.dev',
    description:
      'Personal portfolio with Spotify and chess integrations, dark/light mode, and full i18n support.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    href: 'https://github.com/dieramirezma',
    featured: true,
  },
  {
    slug: 'neptune-fluid',
    title: 'Neptune Fluid Physics',
    description:
      'Real-time fluid simulation rendered in the browser using WebGL and custom GLSL shaders.',
    stack: ['WebGL', 'GLSL', 'TypeScript'],
    href: 'https://github.com/dieramirezma',
    featured: true,
  },
  {
    slug: 'llm-pruner',
    title: 'LLM Context Pruner',
    description:
      'Tool to intelligently prune large context windows before sending to LLM APIs, reducing token cost.',
    stack: ['Python', 'FastAPI', 'Anthropic'],
    href: 'https://github.com/dieramirezma',
    featured: true,
  },
  {
    slug: 'go-crawler',
    title: 'Concurrent Go Crawler',
    description:
      'High-performance web crawler leveraging Go goroutines and channels for concurrent page scraping.',
    stack: ['Go', 'Goroutines', 'HTML'],
    href: 'https://github.com/dieramirezma',
    featured: true,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('selectedWorks')

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.005 }}
      className="group p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-border-hover)] transition-colors duration-200 flex flex-col gap-4"
    >
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map(tech => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>

      {project.href && (
        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 font-mono"
        >
          {t('view_source')}
          <ArrowUpRight size={12} />
        </Link>
      )}
    </motion.div>
  )
}

export function SelectedWorks() {
  const t = useTranslations('selectedWorks')
  const locale = useLocale()

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="py-16 px-10 mx-auto max-w-[1200px]"
    >
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <SectionTitle>{t('title')}</SectionTitle>
        <Link
          href={`/${locale}/projects`}
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 font-mono flex items-center gap-1"
        >
          All projects
          <ArrowUpRight size={13} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </motion.section>
  )
}

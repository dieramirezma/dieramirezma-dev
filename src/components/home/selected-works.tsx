'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { SectionTitle } from '@/components/ui/section-title'
import { Chip } from '@/components/ui/chip'
import type { Project } from '@/types'

const PROJECTS: Project[] = [
  {
    slug: 'react-ai-platform',
    title: 'React AI Platform',
    description:
      'A full-stack AI assistant platform combining real-time streaming, custom tool use, and context-aware sessions.',
    stack: ['Next.js', 'TypeScript', 'Vercel AI SDK'],
    href: 'https://github.com/dieramirezma',
    featured: true,
  },
  {
    slug: 'open-agent-ai',
    title: 'Open-Agent AI',
    description:
      'Open-source LLM orchestration layer with custom agent routing, tool-calling, and memory injection.',
    stack: ['Python', 'FastAPI', 'Anthropic'],
    href: 'https://github.com/dieramirezma',
    featured: true,
  },
  {
    slug: 'raft-go',
    title: 'Raft Go',
    description:
      'A distributed consensus library implementing the Raft protocol for fault-tolerant state machine replication.',
    stack: ['Go', 'gRPC', 'Raft'],
    href: 'https://github.com/dieramirezma',
    featured: true,
  },
  {
    slug: 'neptune-hackathon',
    title: 'Neptune Hackathon',
    description:
      'Physics-based fluid simulation using CSS animations and WebGL shaders. 1st place winner.',
    stack: ['WebGL', 'GLSL', 'CSS'],
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
      className="group flex flex-col border border-[var(--color-border)] bg-[var(--color-surface-1)] rounded-lg overflow-hidden hover:border-[var(--color-border-hover)] transition-colors duration-200"
    >
      {/* Image placeholder */}
      <div className="h-36 bg-[var(--color-surface-2)] border-b border-[var(--color-border)] flex items-center justify-center">
        <div className="w-10 h-10 rounded border border-[var(--color-border)] flex items-center justify-center">
          <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
            {project.slug.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map(tech => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1 border-t border-[var(--color-border)]">
          <Link
            href={project.href ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <ExternalLink size={10} />
            {t('view_project')}
          </Link>
          <Link
            href={project.href ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
          >
            <ArrowUpRight size={10} />
            {t('view_source')}
          </Link>
        </div>
      </div>
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
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="py-16 px-10 mx-auto max-w-[1200px]"
    >
      <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
        <SectionTitle>{t('title')}</SectionTitle>
        <Link
          href={`/${locale}/projects`}
          className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center gap-1"
        >
          {t('view_all')}
          <ArrowUpRight size={12} />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROJECTS.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </motion.section>
  )
}

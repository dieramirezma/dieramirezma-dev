'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/ui/section-title'
import { Chip } from '@/components/ui/chip'

const FRONTEND = ['Next.js 15', 'TypeScript', 'React', 'Tailwind CSS', 'TanStack Query']
const BACKEND = ['Python', 'FastAPI', 'Django', 'Go', 'PostgreSQL']

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function TechStack() {
  const t = useTranslations('techStack')

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="py-16 px-10 mx-auto max-w-[1200px]"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <SectionTitle>{t('title')}</SectionTitle>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)]"
        >
          <p className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-4">
            {t('frontend')}
          </p>
          <div className="flex flex-wrap gap-2">
            {FRONTEND.map(tech => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)]"
        >
          <p className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-4">
            {t('backend')}
          </p>
          <div className="flex flex-wrap gap-2">
            {BACKEND.map(tech => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

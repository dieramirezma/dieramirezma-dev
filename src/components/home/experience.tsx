'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/ui/section-title'

const ROLES = [
  {
    company: 'Dapper',
    role: 'dapper_role',
    date: 'dapper_date',
    summary: 'dapper_summary',
    bullets: ['dapper_1', 'dapper_2', 'dapper_3'],
  },
  {
    company: 'freelance_company',
    role: 'freelance_role',
    date: 'freelance_date',
    summary: 'freelance_summary',
    bullets: ['freelance_1', 'freelance_2'],
  },
] as const

export function Experience() {
  const t = useTranslations('experience')
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 mx-auto max-w-[1200px] px-5 py-20 sm:px-10"
    >
      <div className="mb-10 max-w-2xl">
        <SectionTitle id="experience-heading">{t('title')}</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {t('intro')}
        </p>
      </div>
      <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {ROLES.map((item, index) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.08 }}
            className="grid gap-6 py-8 md:grid-cols-[220px_minmax(0,1fr)] md:py-10"
          >
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">
                {item.company === 'Dapper' ? item.company : t(item.company)}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{t(item.role)}</p>
              <p className="mt-2 font-mono text-[11px] text-[var(--color-text-muted)]">
                {t(item.date)}
              </p>
            </div>
            <div>
              <p className="max-w-3xl leading-relaxed text-[var(--color-text-secondary)]">
                {t(item.summary)}
              </p>
              <ul className="mt-5 space-y-3">
                {item.bullets.map(bullet => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]"
                      aria-hidden="true"
                    />{' '}
                    {t(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

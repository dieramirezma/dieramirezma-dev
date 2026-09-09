'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const ITEMS = [
  ['markets_value', 'markets_label'],
  ['tests_value', 'tests_label'],
  ['architecture_value', 'architecture_label'],
  ['delivery_value', 'delivery_label'],
] as const

export function ProfessionalProof() {
  const t = useTranslations('proof')
  return (
    <section aria-labelledby="proof-heading" className="mx-auto max-w-[1200px] px-5 py-16 sm:px-10">
      <h2
        id="proof-heading"
        className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
      >
        {t('label')}
      </h2>
      <div className="grid grid-cols-2 border-l border-t border-[var(--color-border)] lg:grid-cols-4">
        {ITEMS.map(([value, label], index) => (
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="min-h-36 border-b border-r border-[var(--color-border)] p-5 sm:p-6"
          >
            <p className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              {t(value)}
            </p>
            <p className="mt-3 max-w-40 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
              {t(label)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

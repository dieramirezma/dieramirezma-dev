'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-20 pt-32 sm:px-10 sm:pt-40">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      >
        <motion.p
          variants={fadeInUp}
          className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-primary)]"
        >
          <MapPin size={13} aria-hidden="true" /> {t('eyebrow')}
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--color-text-primary)]"
        >
          {t('title')}
        </motion.h1>
        <motion.div
          variants={fadeInUp}
          className="mt-10 grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto]"
        >
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            {t('description')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}#experience`}
              className="inline-flex items-center gap-2 rounded bg-[var(--color-text-primary)] px-5 py-3 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-85"
            >
              {t('cta_experience')} <ArrowDownRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="https://github.com/dieramirezma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[var(--color-border)] px-5 py-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
            >
              {t('cta_github')} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex items-center gap-3 border-t border-[var(--color-border)] pt-5"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" aria-hidden="true" />
          <p className="font-mono text-[11px] text-[var(--color-text-muted)] sm:text-xs">
            {t('availability')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

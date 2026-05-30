'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Timer } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="pt-28 pb-20 px-10 mx-auto max-w-[1200px]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {/* Credential badges — inline row */}
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] px-3 py-1 rounded-full">
            <Timer size={11} className="text-[var(--color-primary)]" />
            {t('badge_experience')}
          </span>
          <span className="text-[var(--color-border)] select-none">·</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] px-3 py-1 rounded-full">
            <Trophy size={11} className="text-[var(--color-primary)]" />
            {t('credential')}
          </span>
        </motion.div>

        {/* Display headline — name */}
        <motion.h1
          variants={fadeInUp}
          className="text-[clamp(52px,8vw,96px)] font-bold leading-[1.0] text-[var(--color-text-primary)] mb-3"
          style={{ letterSpacing: '-0.04em' }}
        >
          Diego
          <br />
          <span className="text-[var(--color-text-secondary)]">Ramirez</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="font-mono text-sm text-[var(--color-text-muted)] mb-5 tracking-wide"
        >
          — {t('tagline')}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-base text-[var(--color-text-secondary)] max-w-xl leading-relaxed mb-10"
        >
          {t('description')}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--color-text-primary)] text-[var(--color-bg)] text-sm font-medium hover:opacity-85 transition-opacity duration-200"
          >
            {t('cta_projects')}
            <ArrowRight size={14} />
          </Link>
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-all duration-200"
          >
            {t('cta_about')}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const PixelAvatar = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40">
    <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
      {/* Pixel art avatar — grayscale RPG style */}
      {/* Background */}
      <rect width="32" height="32" fill="transparent" />
      {/* Hair */}
      <rect x="10" y="4" width="12" height="3" fill="#4a4a4a" />
      <rect x="9" y="5" width="14" height="2" fill="#3a3a3a" />
      {/* Face */}
      <rect x="10" y="7" width="12" height="10" fill="#d4b896" />
      <rect x="9" y="8" width="1" height="8" fill="#d4b896" />
      <rect x="22" y="8" width="1" height="8" fill="#d4b896" />
      {/* Eyes */}
      <rect x="12" y="10" width="2" height="2" fill="#2a2a2a" />
      <rect x="18" y="10" width="2" height="2" fill="#2a2a2a" />
      {/* Nose */}
      <rect x="15" y="13" width="2" height="1" fill="#b8956e" />
      {/* Mouth */}
      <rect x="13" y="15" width="6" height="1" fill="#8b6347" />
      <rect x="13" y="14" width="1" height="1" fill="#8b6347" />
      <rect x="18" y="14" width="1" height="1" fill="#8b6347" />
      {/* Neck */}
      <rect x="14" y="17" width="4" height="2" fill="#d4b896" />
      {/* Shirt / Body */}
      <rect x="8" y="19" width="16" height="9" fill="#2a2a2a" />
      <rect x="6" y="20" width="2" height="7" fill="#2a2a2a" />
      <rect x="24" y="20" width="2" height="7" fill="#2a2a2a" />
      {/* Collar detail */}
      <rect x="13" y="19" width="6" height="1" fill="#3a3a3a" />
      {/* Shoulders highlight */}
      <rect x="8" y="19" width="16" height="1" fill="#404040" />
    </svg>
    {/* Pixel grid effect overlay */}
    <div
      className="absolute inset-0 border border-[var(--color-border)] rounded"
      style={{
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
      }}
    />
  </div>
)

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="pt-32 pb-20 px-10 mx-auto max-w-[1200px]">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        <motion.div
          className="flex-1 max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Credential badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-primary)] border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 px-3 py-1 rounded-full">
              <Trophy size={11} />
              {t('credential')}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-none mb-4"
            style={{ letterSpacing: '-0.04em' }}
          >
            Diego
            <br />
            <span className="text-[var(--color-text-secondary)]">Ramirez</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-[var(--color-text-secondary)] mb-2 font-mono"
          >
            — {t('tagline')}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-base text-[var(--color-text-muted)] mb-10 max-w-md"
          >
            Software developer focused on building precise, performant, and visually intentional
            digital products.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4 flex-wrap">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--color-text-primary)] text-[var(--color-bg)] text-sm font-medium hover:opacity-90 transition-opacity duration-200"
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

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="shrink-0"
        >
          <PixelAvatar />
        </motion.div>
      </div>
    </section>
  )
}

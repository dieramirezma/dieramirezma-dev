'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/ui/section-title'
import { SpotifyStats } from '@/components/home/spotify-stats'
import { LichessStats } from '@/components/home/lichess-stats'
import { ChessComStats } from '@/components/home/chesscom-stats'

export function Activity() {
  const t = useTranslations('activity')

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="scroll-mt-24 mx-auto max-w-[1200px] px-5 py-20 sm:px-10"
    >
      <div className="mb-10 max-w-2xl">
        <SectionTitle id="activity-heading">{t('title')}</SectionTitle>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          {t('intro')}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-4 lg:grid-cols-3"
      >
        <SpotifyStats />
        <LichessStats />
        <ChessComStats />
      </motion.div>
    </section>
  )
}

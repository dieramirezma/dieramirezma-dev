'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Music } from 'lucide-react'
import { useNowPlaying } from '@/hooks/use-now-playing'
import { SectionTitle } from '@/components/ui/section-title'

function EqBars() {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="w-1 bg-[var(--color-primary)] rounded-sm"
          animate={{
            height: ['40%', '100%', '60%', '80%', '40%'],
          }}
          transition={{
            duration: 0.8 + i * 0.1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
          style={{ minHeight: 4 }}
        />
      ))}
    </div>
  )
}

export function NowPlaying() {
  const t = useTranslations('nowPlaying')
  const { data, isLoading } = useNowPlaying()

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="py-16 px-10 mx-auto max-w-[1200px]"
    >
      <SectionTitle className="mb-8">{t('title')}</SectionTitle>

      <div className="p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] max-w-sm">
        {isLoading ? (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded bg-[var(--color-surface-2)]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-[var(--color-surface-2)] rounded w-3/4" />
              <div className="h-3 bg-[var(--color-surface-2)] rounded w-1/2" />
            </div>
          </div>
        ) : data?.isPlaying && data.title ? (
          <Link
            href={data.songUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            {data.albumArt ? (
              <Image
                src={data.albumArt}
                alt={data.title}
                width={48}
                height={48}
                className="rounded shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
                <Music size={20} className="text-[var(--color-text-muted)]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                {data.title}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] truncate">{data.artist}</p>
            </div>
            <EqBars />
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
              <Music size={20} className="text-[var(--color-text-muted)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)]">{t('not_playing')}</p>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">{t('via')}</p>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}

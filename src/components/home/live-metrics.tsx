'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Code2, Server, Music } from 'lucide-react'
import { SectionTitle } from '@/components/ui/section-title'
import { Chip } from '@/components/ui/chip'
import { useNowPlaying } from '@/hooks/use-now-playing'
import { useLichessStats, useChessComStats } from '@/hooks/use-chess-stats'

const FRONTEND = [
  { label: 'Next.js 15' },
  { label: 'TypeScript' },
  { label: 'React' },
  { label: 'Tailwind CSS' },
  { label: 'TanStack Query' },
]

const BACKEND = [
  { label: 'Python' },
  { label: 'FastAPI' },
  { label: 'Django' },
  { label: 'Go' },
  { label: 'PostgreSQL' },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function EqBars() {
  return (
    <div className="flex items-end gap-0.5 h-3.5">
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="w-0.5 bg-[var(--color-primary)] rounded-sm"
          animate={{ height: ['40%', '100%', '60%', '85%', '40%'] }}
          transition={{
            duration: 0.75 + i * 0.1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
          style={{ minHeight: 3 }}
        />
      ))}
    </div>
  )
}

function NowPlayingWidget() {
  const t = useTranslations('nowPlaying')
  const { data, isLoading } = useNowPlaying()

  return (
    <div className="pt-4 border-t border-[var(--color-border)]">
      <p className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
        {t('title')}
      </p>

      {isLoading ? (
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-9 h-9 rounded bg-[var(--color-surface-2)] shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 bg-[var(--color-surface-2)] rounded w-3/4" />
            <div className="h-2 bg-[var(--color-surface-2)] rounded w-1/2" />
          </div>
        </div>
      ) : data?.isPlaying && data.title ? (
        <Link
          href={data.songUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          {data.albumArt ? (
            <Image
              src={data.albumArt}
              alt={data.title}
              width={36}
              height={36}
              className="rounded shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
              <Music size={14} className="text-[var(--color-text-muted)]" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary)] transition-colors">
              {data.title}
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] truncate">{data.artist}</p>
          </div>
          <EqBars />
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
            <Music size={14} className="text-[var(--color-text-muted)]" />
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{t('not_playing')}</p>
        </div>
      )}
    </div>
  )
}

type ChessPlatform = 'lichess' | 'chesscom'

function ChessWidget() {
  const t = useTranslations('chess')
  const [platform, setPlatform] = useState<ChessPlatform>('lichess')
  const { data: lichess } = useLichessStats()
  const { data: chesscom } = useChessComStats()

  const ratings =
    platform === 'lichess'
      ? [
          { label: 'Blitz', data: lichess?.blitz },
          { label: 'Rapid', data: lichess?.rapid },
        ]
      : [
          { label: 'Blitz', data: chesscom?.blitz },
          { label: 'Rapid', data: chesscom?.rapid },
        ]

  return (
    <div className="pt-4 border-t border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-widest uppercase">
          {t('title')}
        </p>
        <div className="flex items-center rounded border border-[var(--color-border)] overflow-hidden">
          {(['lichess', 'chesscom'] as ChessPlatform[]).map(p => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-2 py-0.5 text-[10px] font-mono transition-colors duration-150 ${
                platform === p
                  ? 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              {p === 'lichess' ? 'Lichess' : 'Chess.com'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {ratings.map(({ label, data }) =>
          data ? (
            <div key={label}>
              <p className="text-xl font-bold text-[var(--color-text-primary)] leading-none">
                {data.rating}
              </p>
              <p className="font-mono text-[10px] text-[var(--color-text-muted)] mt-0.5">
                {label} · {data.games} {t('games')}
              </p>
              {data.wins != null && (
                <div className="flex gap-2 mt-1.5">
                  <span className="font-mono text-[9px] text-[var(--color-success)]">
                    W:{data.wins}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-error)]">
                    L:{data.losses}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-text-muted)]">
                    D:{data.draws}
                  </span>
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export function LiveMetrics() {
  const t = useTranslations('liveMetrics')

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className="py-16 px-10 mx-auto max-w-[1200px]"
    >
      <motion.div variants={fadeInUp} className="mb-8">
        <SectionTitle>{t('title')}</SectionTitle>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Frontend Core */}
        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] flex flex-col gap-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code2 size={14} className="text-[var(--color-primary)]" />
              <p className="font-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase">
                {t('frontend')}
              </p>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t('frontend_desc')}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FRONTEND.map(({ label }) => (
              <Chip key={label}>{label}</Chip>
            ))}
          </div>

          <NowPlayingWidget />
        </motion.div>

        {/* Backend Ecosystem */}
        <motion.div
          variants={fadeInUp}
          className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] flex flex-col gap-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Server size={14} className="text-[var(--color-primary)]" />
              <p className="font-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase">
                {t('backend')}
              </p>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              {t('backend_desc')}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {BACKEND.map(({ label }) => (
              <Chip key={label}>{label}</Chip>
            ))}
          </div>

          <ChessWidget />
        </motion.div>
      </div>
    </motion.section>
  )
}

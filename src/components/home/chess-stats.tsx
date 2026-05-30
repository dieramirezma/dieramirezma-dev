'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { SectionTitle } from '@/components/ui/section-title'
import { useLichessStats, useChessComStats } from '@/hooks/use-chess-stats'
import type { ChessRating } from '@/types'

type Platform = 'lichess' | 'chesscom'

function RatingCard({ label, data }: { label: string; data: ChessRating | undefined }) {
  const t = useTranslations('chess')

  if (!data) return null

  const winRate = data.wins && data.games ? Math.round((data.wins / data.games) * 100) : null

  return (
    <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)]">
      <p className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest uppercase mb-2">
        {label}
      </p>
      <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">{data.rating}</p>
      <p className="text-xs text-[var(--color-text-muted)]">
        {data.games.toLocaleString()} {t('games')}
      </p>
      {winRate !== null && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
            <span>{t('winrate')}</span>
            <span>{winRate}%</span>
          </div>
          <div className="h-1 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
              style={{ width: `${winRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export function ChessStats() {
  const t = useTranslations('chess')
  const [platform, setPlatform] = useState<Platform>('lichess')
  const { data: lichess, isLoading: lichessLoading } = useLichessStats()
  const { data: chesscom, isLoading: chesscomLoading } = useChessComStats()

  const isLoading = platform === 'lichess' ? lichessLoading : chesscomLoading

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="py-16 px-10 mx-auto max-w-[1200px]"
    >
      <div className="flex items-center justify-between mb-8">
        <SectionTitle>{t('title')}</SectionTitle>
        <div className="flex items-center rounded border border-[var(--color-border)] overflow-hidden">
          {(['lichess', 'chesscom'] as Platform[]).map(p => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1.5 text-xs font-mono transition-colors duration-200 ${
                platform === p
                  ? 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {p === 'lichess' ? 'Lichess' : 'Chess.com'}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] animate-pulse h-28"
            />
          ))}
        </div>
      ) : platform === 'lichess' && lichess ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RatingCard label="Blitz" data={lichess.blitz} />
          <RatingCard label="Rapid" data={lichess.rapid} />
          <RatingCard label="Classical" data={lichess.classical} />
        </div>
      ) : platform === 'chesscom' && chesscom ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RatingCard label="Bullet" data={chesscom.bullet} />
          <RatingCard label="Blitz" data={chesscom.blitz} />
          <RatingCard label="Rapid" data={chesscom.rapid} />
        </div>
      ) : (
        <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-1)] text-center">
          <p className="text-sm text-[var(--color-text-muted)]">No chess data available</p>
        </div>
      )}
    </motion.section>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Music } from 'lucide-react'
import { ActivityCard } from '@/components/ui/activity-card'
import { Chip } from '@/components/ui/chip'
import { CardSkeleton, Unavailable } from '@/components/home/chess-parts'
import { useNowPlaying } from '@/hooks/use-now-playing'
import { useSpotifyTop } from '@/hooks/use-spotify-top'
import type { SpotifyRange } from '@/types'

const RANGES: SpotifyRange[] = ['short_term', 'medium_term', 'long_term']

function EqBars() {
  return (
    <div className="flex h-3.5 items-end gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="w-0.5 rounded-sm bg-[var(--color-primary)]"
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

function formatAgo(playedAt: string, locale: string) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(playedAt).getTime()) / 60000))
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  if (minutes < 60) return rtf.format(-minutes, 'minute')
  if (minutes < 1440) return rtf.format(-Math.round(minutes / 60), 'hour')
  return rtf.format(-Math.round(minutes / 1440), 'day')
}

function NowPlayingRow() {
  const t = useTranslations('activity')
  const locale = useLocale()
  const { data, isLoading } = useNowPlaying()

  if (isLoading) {
    return <div className="h-12 animate-pulse rounded bg-[var(--color-surface-2)]" />
  }

  if (!data?.title) {
    return <p className="text-sm text-[var(--color-text-muted)]">{t('not_playing')}</p>
  }

  const label = data.isPlaying
    ? t('now_playing')
    : data.playedAt
      ? `${t('last_played')} · ${formatAgo(data.playedAt, locale)}`
      : t('last_played')

  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-muted)]">
        {label}
      </p>
      <Link
        href={data.songUrl ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3"
      >
        {data.albumArt ? (
          <Image
            src={data.albumArt}
            alt={data.title}
            width={48}
            height={48}
            className="shrink-0 rounded"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[var(--color-surface-2)]">
            <Music size={16} className="text-[var(--color-text-muted)]" aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
            {data.title}
          </p>
          <p className="truncate text-xs text-[var(--color-text-muted)]">{data.artist}</p>
        </div>
        {data.isPlaying ? <EqBars /> : null}
      </Link>
    </div>
  )
}

function TopLists() {
  const t = useTranslations('activity')
  const [range, setRange] = useState<SpotifyRange>('short_term')
  const { data, isLoading } = useSpotifyTop(range)

  return (
    <div className="border-t border-[var(--color-border)] pt-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-muted)]">
          {t('top_tracks')}
        </p>
        <div className="flex overflow-hidden rounded border border-[var(--color-border)]">
          {RANGES.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={`px-2 py-1 font-mono text-[10px] transition-colors ${
                range === r
                  ? 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              {t(`range_${r}`)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : !data ? (
        <Unavailable />
      ) : (
        <>
          <ol className="space-y-3">
            {data.tracks.map((track, index) => (
              <li key={track.url}>
                <Link
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3"
                >
                  <span className="w-3 font-mono text-[11px] text-[var(--color-text-muted)]">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                      {track.title}
                    </span>
                    <span className="block truncate text-xs text-[var(--color-text-muted)]">
                      {track.artist}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-muted)]">
            {t('top_artists')}
          </p>
          <div className="flex flex-wrap gap-2">
            {data.artists.map(artist => (
              <Chip key={artist.url}>{artist.name}</Chip>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function SpotifyStats() {
  return (
    <ActivityCard icon={Music} title="Spotify">
      <NowPlayingRow />
      <TopLists />
    </ActivityCard>
  )
}

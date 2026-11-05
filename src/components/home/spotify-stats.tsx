'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className="flex h-3.5 items-end gap-0.5" aria-hidden="true">
        {[60, 100, 75, 45].map(h => (
          <div key={h} className="w-0.5 rounded-sm bg-accent" style={{ height: `${h}%` }} />
        ))}
      </div>
    )
  }
  return (
    <div className="flex h-3.5 items-end gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          className="w-0.5 rounded-sm bg-accent"
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

function TrackLink({ href, children }: { href?: string; children: React.ReactNode }) {
  const className = 'group flex items-center gap-3'
  if (!href) return <div className={className}>{children}</div>
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </Link>
  )
}

function NowPlayingRow() {
  const t = useTranslations('activity')
  const locale = useLocale()
  const { data, isLoading } = useNowPlaying()

  if (isLoading) {
    return <div className="h-12 animate-pulse rounded bg-raised" />
  }

  if (!data?.title) {
    return <p className="text-sm text-subtle">{t('not_playing')}</p>
  }

  const label = data.isPlaying
    ? t('now_playing')
    : data.playedAt
      ? `${t('last_played')} · ${formatAgo(data.playedAt, locale)}`
      : t('last_played')

  return (
    <div>
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-subtle">{label}</p>
      <TrackLink href={data.songUrl}>
        {data.albumArt ? (
          <Image
            src={data.albumArt}
            alt={data.title}
            width={48}
            height={48}
            className="shrink-0 rounded"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-raised">
            <Music size={16} className="text-subtle" aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-fg transition-colors group-hover:text-accent">
            {data.title}
          </p>
          <p className="truncate text-xs text-subtle">{data.artist}</p>
        </div>
        {data.isPlaying ? <EqBars /> : null}
      </TrackLink>
    </div>
  )
}

function TopLists() {
  const t = useTranslations('activity')
  const [range, setRange] = useState<SpotifyRange>('short_term')
  const { data, isLoading } = useSpotifyTop(range)

  return (
    <div className="border-t border-rule pt-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-subtle">{t('top_tracks')}</p>
        <div className="flex overflow-hidden rounded border border-rule">
          {RANGES.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={`px-2 py-1 font-mono text-xs transition-colors ${
                range === r ? 'bg-raised text-fg' : 'text-subtle hover:text-muted'
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
                  <span className="w-3 font-mono text-xs text-subtle">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-fg transition-colors group-hover:text-accent">
                      {track.title}
                    </span>
                    <span className="block truncate text-xs text-subtle">{track.artist}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mb-3 mt-6 font-mono text-xs uppercase tracking-widest text-subtle">
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
  const t = useTranslations('activity')
  const [showTop, setShowTop] = useState(false)

  return (
    <ActivityCard icon={Music} title="Spotify">
      <NowPlayingRow />
      <div>
        <button
          type="button"
          onClick={() => setShowTop(value => !value)}
          aria-expanded={showTop}
          className="link-underline -my-2 py-2 font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-accent"
        >
          {showTop ? '− ' : '+ '}
          {showTop ? t('hide_top') : t('show_top')}
        </button>
        {showTop ? (
          <div className="mt-5">
            <TopLists />
          </div>
        ) : null}
      </div>
    </ActivityCard>
  )
}

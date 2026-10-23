'use client'

import { useTranslations } from 'next-intl'
import { Swords } from 'lucide-react'
import { ActivityCard } from '@/components/ui/activity-card'
import {
  CardSkeleton,
  ExtraStat,
  RatingRow,
  RecordBar,
  Unavailable,
} from '@/components/home/chess-parts'
import { useLichessLive, useLichessStats } from '@/hooks/use-chess-stats'
import type { ChessMode } from '@/types'

const MODES: { key: ChessMode; label: string }[] = [
  { key: 'bullet', label: 'Bullet' },
  { key: 'blitz', label: 'Blitz' },
  { key: 'rapid', label: 'Rapid' },
  { key: 'classical', label: 'Classical' },
]

function LiveGame({ gameId }: { gameId: string }) {
  const t = useTranslations('activity')

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-error)]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-error)]" />
        {t('live_game')}
      </p>
      <iframe
        src={`https://lichess.org/embed/game/${gameId}?theme=auto&bg=auto`}
        title={t('live_game')}
        loading="lazy"
        className="aspect-[400/444] w-full rounded border border-[var(--color-border)]"
      />
    </div>
  )
}

export function LichessStats() {
  const t = useTranslations('activity')
  const { data, isLoading } = useLichessStats()
  const { data: live } = useLichessLive()

  return (
    <ActivityCard icon={Swords} title="Lichess" href={data?.url}>
      {isLoading ? (
        <CardSkeleton />
      ) : !data ? (
        <Unavailable />
      ) : (
        <>
          {live?.playing && live.gameId ? <LiveGame gameId={live.gameId} /> : null}
          <div className="space-y-3">
            {MODES.map(({ key, label }) => {
              const rating = data.ratings[key]
              return rating ? <RatingRow key={key} label={label} data={rating} /> : null
            })}
          </div>
          {data.record ? <RecordBar record={data.record} /> : null}
          <div className="flex gap-8">
            {data.puzzle ? <ExtraStat label={t('puzzles')} value={data.puzzle} /> : null}
            {data.hoursPlayed ? (
              <ExtraStat label={t('hours_played')} value={data.hoursPlayed.toLocaleString()} />
            ) : null}
          </div>
        </>
      )}
    </ActivityCard>
  )
}

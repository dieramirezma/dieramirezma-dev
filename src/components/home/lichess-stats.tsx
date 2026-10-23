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
import { useLichessStats } from '@/hooks/use-chess-stats'
import type { ChessMode } from '@/types'

const MODES: { key: ChessMode; label: string }[] = [
  { key: 'bullet', label: 'Bullet' },
  { key: 'blitz', label: 'Blitz' },
  { key: 'rapid', label: 'Rapid' },
  { key: 'classical', label: 'Classical' },
]

export function LichessStats() {
  const t = useTranslations('activity')
  const { data, isLoading } = useLichessStats()

  return (
    <ActivityCard icon={Swords} title="Lichess" href={data?.url}>
      {isLoading ? (
        <CardSkeleton />
      ) : !data ? (
        <Unavailable />
      ) : (
        <>
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

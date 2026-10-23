'use client'

import { useTranslations } from 'next-intl'
import { Crown } from 'lucide-react'
import { ActivityCard } from '@/components/ui/activity-card'
import {
  CardSkeleton,
  ExtraStat,
  RatingRow,
  RecordBar,
  Unavailable,
} from '@/components/home/chess-parts'
import { useChessComStats } from '@/hooks/use-chess-stats'

const MODES = [
  { key: 'bullet', label: 'Bullet' },
  { key: 'blitz', label: 'Blitz' },
  { key: 'rapid', label: 'Rapid' },
] as const

export function ChessComStats() {
  const t = useTranslations('activity')
  const { data, isLoading } = useChessComStats()

  return (
    <ActivityCard icon={Crown} title="Chess.com" href={data?.url}>
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
            {data.puzzleRush ? (
              <ExtraStat label={t('puzzle_rush')} value={data.puzzleRush} />
            ) : null}
            {data.followers != null ? (
              <ExtraStat label={t('followers')} value={data.followers.toLocaleString()} />
            ) : null}
          </div>
        </>
      )}
    </ActivityCard>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { Crown } from 'lucide-react'
import { ActivityCard } from '@/components/ui/activity-card'
import { CardSkeleton, RatingList, Unavailable } from '@/components/home/chess-parts'
import { useChessComStats } from '@/hooks/use-chess-stats'

export function ChessComStats() {
  const t = useTranslations('activity')
  const { data, isLoading } = useChessComStats()

  return (
    <ActivityCard icon={Crown} title="Chess.com" href={data?.url} linkLabel={t('profile')}>
      {isLoading ? (
        <CardSkeleton />
      ) : !data ? (
        <Unavailable />
      ) : (
        <RatingList
          ratings={[
            { label: 'Rapid', data: data.ratings.rapid },
            { label: 'Blitz', data: data.ratings.blitz },
            { label: 'Bullet', data: data.ratings.bullet },
          ]}
        />
      )}
    </ActivityCard>
  )
}

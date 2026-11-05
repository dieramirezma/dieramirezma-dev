'use client'

import { useTranslations } from 'next-intl'
import { Swords } from 'lucide-react'
import { ActivityCard } from '@/components/ui/activity-card'
import { CardSkeleton, RatingList, Unavailable } from '@/components/home/chess-parts'
import { LiveBoard } from '@/components/home/live-board'
import { useLichessLive, useLichessStats } from '@/hooks/use-chess-stats'

function LiveGame({ gameId, username }: { gameId: string; username: string }) {
  const t = useTranslations('activity')

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-success">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" aria-hidden="true" />
        {t('live_game')}
      </p>
      <LiveBoard gameId={gameId} username={username} />
    </div>
  )
}

export function LichessStats() {
  const t = useTranslations('activity')
  const { data, isLoading } = useLichessStats()
  const { data: live } = useLichessLive()

  return (
    <ActivityCard icon={Swords} title="Lichess" href={data?.url} linkLabel={t('profile')}>
      {isLoading ? (
        <CardSkeleton />
      ) : !data ? (
        <Unavailable />
      ) : (
        <>
          {live?.playing && live.gameId ? (
            <LiveGame gameId={live.gameId} username={data.username} />
          ) : null}
          <RatingList
            ratings={[
              { label: 'Rapid', data: data.ratings.rapid },
              { label: 'Blitz', data: data.ratings.blitz },
              { label: 'Bullet', data: data.ratings.bullet },
              { label: 'Classical', data: data.ratings.classical },
            ]}
          />
        </>
      )}
    </ActivityCard>
  )
}

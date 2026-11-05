import { useTranslations } from 'next-intl'
import { SpotifyStats } from '@/components/home/spotify-stats'
import { LichessStats } from '@/components/home/lichess-stats'
import { ChessComStats } from '@/components/home/chesscom-stats'

const cell = 'bg-bg py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0'

export function Activity() {
  const t = useTranslations('activity')

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="border-t border-rule py-10 md:py-12"
    >
      <div className="page">
        <h2 id="activity-heading" className="meta">
          {t('label')}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-px border-y border-rule bg-rule lg:grid-cols-3">
          <div className={cell}>
            <SpotifyStats />
          </div>
          <div className={cell}>
            <LichessStats />
          </div>
          <div className={cell}>
            <ChessComStats />
          </div>
        </div>
      </div>
    </section>
  )
}

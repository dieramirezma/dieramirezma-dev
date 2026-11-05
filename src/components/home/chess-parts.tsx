import { useTranslations } from 'next-intl'
import type { ChessRating } from '@/types'

interface RatingListProps {
  ratings: { label: string; data?: ChessRating }[]
}

export function RatingList({ ratings }: RatingListProps) {
  const rows = ratings.filter((row): row is { label: string; data: ChessRating } => !!row.data)
  if (!rows.length) return null

  return (
    <dl className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
      {rows.map(({ label, data }) => (
        <div key={label} className="flex items-baseline gap-2">
          <dt className="text-xs uppercase tracking-[0.08em] text-subtle">{label}</dt>
          <dd className="text-fg">{data.rating}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Unavailable() {
  const t = useTranslations('activity')
  return <p className="text-sm text-subtle">{t('unavailable')}</p>
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-2" aria-hidden="true">
      {[1, 2].map(i => (
        <div key={i} className="h-5 rounded-[2px] bg-raised" />
      ))}
    </div>
  )
}

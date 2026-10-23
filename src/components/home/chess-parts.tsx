import { useTranslations } from 'next-intl'
import type { ChessRating, ChessRecord } from '@/types'

interface RatingRowProps {
  label: string
  data: ChessRating
}

export function RatingRow({ label, data }: RatingRowProps) {
  const t = useTranslations('activity')
  const { progress, best } = data

  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-3 last:border-b-0 last:pb-0">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-muted)]">
          {label}
        </p>
        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
          {data.games.toLocaleString()} {t('games')}
        </p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-semibold leading-none tracking-tight text-[var(--color-text-primary)]">
          {data.rating}
        </p>
        {progress ? (
          <p
            className={`mt-1 font-mono text-[11px] ${
              progress > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
            }`}
          >
            {progress > 0 ? '+' : ''}
            {progress}
          </p>
        ) : best ? (
          <p className="mt-1 font-mono text-[11px] text-[var(--color-text-muted)]">
            {t('best')} {best}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function RecordBar({ record }: { record: ChessRecord }) {
  const t = useTranslations('activity')
  const total = record.wins + record.losses + record.draws
  if (!total) return null

  const winRate = Math.round((record.wins / total) * 100)
  const segments = [
    { key: 'wins', value: record.wins, color: 'var(--color-success)' },
    { key: 'draws', value: record.draws, color: 'var(--color-text-muted)' },
    { key: 'losses', value: record.losses, color: 'var(--color-error)' },
  ] as const

  return (
    <div>
      <div className="mb-2 flex justify-between font-mono text-[11px] text-[var(--color-text-muted)]">
        <span>{t('winrate')}</span>
        <span className="text-[var(--color-text-primary)]">{winRate}%</span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
        {segments.map(({ key, value, color }) => (
          <div key={key} style={{ width: `${(value / total) * 100}%`, backgroundColor: color }} />
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] text-[var(--color-text-muted)]">
        {record.wins.toLocaleString()}W · {record.draws.toLocaleString()}D ·{' '}
        {record.losses.toLocaleString()}L
      </p>
    </div>
  )
}

export function ExtraStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
        {value}
      </p>
      <p className="font-mono text-[11px] text-[var(--color-text-muted)]">{label}</p>
    </div>
  )
}

export function Unavailable() {
  const t = useTranslations('activity')
  return <p className="text-sm text-[var(--color-text-muted)]">{t('unavailable')}</p>
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden="true">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-10 rounded bg-[var(--color-surface-2)]" />
      ))}
    </div>
  )
}

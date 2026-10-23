'use client'

import { useTranslations } from 'next-intl'
import { useLichessGame } from '@/hooks/use-lichess-game'
import type { LichessGamePlayer } from '@/types'

const GLYPHS: Record<string, string> = {
  k: '♚',
  q: '♛',
  r: '♜',
  b: '♝',
  n: '♞',
  p: '♟',
}

interface Piece {
  type: string
  isWhite: boolean
  file: number
  rank: number
}

function parseFen(fen: string): Piece[] {
  const pieces: Piece[] = []
  fen
    .split(' ')[0]
    .split('/')
    .forEach((row, index) => {
      let file = 0
      for (const char of row) {
        if (/\d/.test(char)) {
          file += Number(char)
        } else {
          pieces.push({
            type: char.toLowerCase(),
            isWhite: char === char.toUpperCase(),
            file,
            rank: 7 - index,
          })
          file += 1
        }
      }
    })
  return pieces
}

function squareOf(name: string) {
  return { file: name.charCodeAt(0) - 97, rank: Number(name[1]) - 1 }
}

function formatClock(seconds?: number) {
  if (seconds === undefined) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function PlayerBar({ player, clock }: { player: LichessGamePlayer; clock?: number }) {
  return (
    <div className="flex items-center justify-between font-mono text-[11px] text-[var(--color-text-secondary)]">
      <span className="truncate">
        {player.name}
        {player.rating ? (
          <span className="text-[var(--color-text-muted)]"> ({player.rating})</span>
        ) : null}
      </span>
      <span className="text-[var(--color-text-primary)]">{formatClock(clock)}</span>
    </div>
  )
}

export function LiveBoard({ gameId, username }: { gameId: string; username: string }) {
  const t = useTranslations('activity')
  const game = useLichessGame(gameId)

  if (!game) {
    return (
      <div className="aspect-square w-full animate-pulse rounded bg-[var(--color-surface-2)]" />
    )
  }

  const flipped = game.black.name.toLowerCase() === username.toLowerCase()
  const toView = (file: number, rank: number) => ({
    x: flipped ? 7 - file : file,
    y: flipped ? rank : 7 - rank,
  })

  const highlighted = game.lastMove
    ? [squareOf(game.lastMove.slice(0, 2)), squareOf(game.lastMove.slice(2, 4))]
    : []

  const top = flipped ? game.white : game.black
  const bottom = flipped ? game.black : game.white
  const topClock = flipped ? game.whiteClock : game.blackClock
  const bottomClock = flipped ? game.blackClock : game.whiteClock

  return (
    <div className="space-y-2">
      <PlayerBar player={top} clock={topClock} />
      <svg
        viewBox="0 0 8 8"
        role="img"
        aria-label={t('live_game')}
        className="w-full overflow-hidden rounded border border-[var(--color-border)]"
      >
        {Array.from({ length: 64 }, (_, i) => {
          const x = i % 8
          const y = Math.floor(i / 8)
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={
                (x + y) % 2 === 0
                  ? 'var(--color-surface-2)'
                  : 'color-mix(in srgb, var(--color-primary) 30%, var(--color-surface-2))'
              }
            />
          )
        })}
        {highlighted.map(({ file, rank }) => {
          const { x, y } = toView(file, rank)
          return (
            <rect
              key={`${file}${rank}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="var(--color-primary)"
              opacity={0.45}
            />
          )
        })}
        {parseFen(game.fen).map(piece => {
          const { x, y } = toView(piece.file, piece.rank)
          return (
            <text
              key={`${piece.file}${piece.rank}`}
              x={x + 0.5}
              y={y + 0.5}
              fontSize={0.82}
              textAnchor="middle"
              dominantBaseline="central"
              fill={piece.isWhite ? '#f4f4f5' : '#09090b'}
              stroke={piece.isWhite ? '#09090b' : '#f4f4f5'}
              strokeWidth={0.025}
              paintOrder="stroke"
            >
              {GLYPHS[piece.type]}
            </text>
          )
        })}
      </svg>
      <PlayerBar player={bottom} clock={bottomClock} />
    </div>
  )
}

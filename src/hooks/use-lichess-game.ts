'use client'

import { useEffect, useState } from 'react'
import type { LichessGameState } from '@/types'

interface StreamPlayer {
  user?: { name: string }
  rating?: number
  aiLevel?: number
}

interface StreamLine {
  id?: string
  initialFen?: string
  players?: { white: StreamPlayer; black: StreamPlayer }
  fen?: string
  lm?: string
  wc?: number
  bc?: number
}

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

function playerName(player: StreamPlayer): string {
  if (player.user) return player.user.name
  return player.aiLevel ? `Stockfish ${player.aiLevel}` : 'Anonymous'
}

export function useLichessGame(gameId: string | undefined) {
  const [game, setGame] = useState<LichessGameState | null>(null)

  useEffect(() => {
    if (!gameId) return

    const controller = new AbortController()

    async function stream() {
      try {
        const res = await fetch(`https://lichess.org/api/stream/game/${gameId}`, {
          signal: controller.signal,
        })
        if (!res.ok || !res.body) return

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.trim()) continue
            const data = JSON.parse(line) as StreamLine

            setGame(prev => {
              if (data.players) {
                return {
                  fen:
                    data.initialFen && data.initialFen !== 'startpos' ? data.initialFen : START_FEN,
                  white: {
                    name: playerName(data.players.white),
                    rating: data.players.white.rating,
                  },
                  black: {
                    name: playerName(data.players.black),
                    rating: data.players.black.rating,
                  },
                }
              }
              if (!prev || !data.fen) return prev
              return {
                ...prev,
                fen: data.fen,
                lastMove: data.lm,
                whiteClock: data.wc,
                blackClock: data.bc,
              }
            })
          }
        }
      } catch {
        return
      }
    }

    stream()
    return () => {
      controller.abort()
      setGame(null)
    }
  }, [gameId])

  return game
}

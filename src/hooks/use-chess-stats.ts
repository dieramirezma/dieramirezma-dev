'use client'

import { useQuery } from '@tanstack/react-query'
import type { LichessStats, ChessComStats } from '@/types'

async function fetchLichess(): Promise<LichessStats | null> {
  const res = await fetch('/api/chess/lichess')
  if (!res.ok) return null
  return res.json()
}

async function fetchChessCom(): Promise<ChessComStats | null> {
  const res = await fetch('/api/chess/chesscom')
  if (!res.ok) return null
  return res.json()
}

export function useLichessStats() {
  return useQuery({
    queryKey: ['chess-lichess'],
    queryFn: fetchLichess,
    staleTime: 3600 * 1000,
  })
}

export function useChessComStats() {
  return useQuery({
    queryKey: ['chess-chesscom'],
    queryFn: fetchChessCom,
    staleTime: 3600 * 1000,
  })
}

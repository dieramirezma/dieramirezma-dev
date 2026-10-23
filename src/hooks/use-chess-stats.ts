'use client'

import { useQuery } from '@tanstack/react-query'
import type { LichessStats, LichessLive, ChessComStats } from '@/types'

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

async function fetchLichessLive(): Promise<LichessLive> {
  const res = await fetch('/api/chess/lichess/live')
  if (!res.ok) return { playing: false }
  return res.json()
}

export function useLichessLive() {
  return useQuery({
    queryKey: ['chess-lichess-live'],
    queryFn: fetchLichessLive,
    refetchInterval: 20000,
    staleTime: 15000,
  })
}

export function useChessComStats() {
  return useQuery({
    queryKey: ['chess-chesscom'],
    queryFn: fetchChessCom,
    staleTime: 3600 * 1000,
  })
}

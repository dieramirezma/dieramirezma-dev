'use client'

import { useQuery } from '@tanstack/react-query'
import type { NowPlayingData } from '@/types'

async function fetchNowPlaying(): Promise<NowPlayingData> {
  const res = await fetch('/api/spotify/now-playing')
  if (!res.ok) return { isPlaying: false }
  return res.json()
}

export function useNowPlaying() {
  return useQuery({
    queryKey: ['now-playing'],
    queryFn: fetchNowPlaying,
    refetchInterval: 30000,
    staleTime: 25000,
  })
}

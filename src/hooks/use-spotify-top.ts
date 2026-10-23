'use client'

import { useQuery } from '@tanstack/react-query'
import type { SpotifyRange, SpotifyTopData } from '@/types'

async function fetchTop(range: SpotifyRange): Promise<SpotifyTopData | null> {
  const res = await fetch(`/api/spotify/top?range=${range}`)
  if (!res.ok) return null
  return res.json()
}

export function useSpotifyTop(range: SpotifyRange) {
  return useQuery({
    queryKey: ['spotify-top', range],
    queryFn: () => fetchTop(range),
    staleTime: 3600 * 1000,
  })
}

import { NextResponse } from 'next/server'
import { getTopStats } from '@/lib/spotify'
import type { SpotifyRange } from '@/types'

const RANGES: SpotifyRange[] = ['short_term', 'medium_term', 'long_term']

export async function GET(request: Request) {
  const param = new URL(request.url).searchParams.get('range')
  const range = RANGES.find(r => r === param) ?? 'short_term'

  const data = await getTopStats(range)
  if (!data) return NextResponse.json(null, { status: 404 })

  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
  })
}

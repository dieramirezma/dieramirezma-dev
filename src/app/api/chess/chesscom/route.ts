import { NextResponse } from 'next/server'
import { getChessComStats } from '@/lib/chess'

export async function GET() {
  const data = await getChessComStats()
  if (!data) return NextResponse.json(null, { status: 404 })
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
  })
}

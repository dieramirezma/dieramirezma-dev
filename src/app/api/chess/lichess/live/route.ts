import { NextResponse } from 'next/server'
import { getLichessLive } from '@/lib/chess'

export async function GET() {
  const data = await getLichessLive()
  return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
}

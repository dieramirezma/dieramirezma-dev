import type {
  ChessComStats,
  ChessMode,
  ChessRating,
  ChessRecord,
  LichessLive,
  LichessStats,
} from '@/types'

const REVALIDATE = 3600
const CHESSCOM_HEADERS = {
  'User-Agent': 'dieramirezma.dev portfolio (https://dieramirezma.dev)',
}

interface LichessPerf {
  games: number
  rating: number
  prog?: number
}

interface ChessComMode {
  last?: { rating: number }
  best?: { rating: number }
  record?: { win: number; loss: number; draw: number }
}

export async function getLichessStats(): Promise<LichessStats | null> {
  const username = process.env.LICHESS_USERNAME
  if (!username) return null

  const token = process.env.LICHESS_API_TOKEN

  try {
    const res = await fetch(`https://lichess.org/api/user/${username}`, {
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE },
    })

    if (!res.ok) return null
    const data = await res.json()

    const ratings: LichessStats['ratings'] = {}
    for (const mode of ['bullet', 'blitz', 'rapid', 'classical'] as ChessMode[]) {
      const perf = data.perfs?.[mode] as LichessPerf | undefined
      if (perf && perf.games > 0) {
        ratings[mode] = { rating: perf.rating, games: perf.games, progress: perf.prog }
      }
    }

    const record: ChessRecord | undefined = data.count
      ? { wins: data.count.win, losses: data.count.loss, draws: data.count.draw }
      : undefined

    return {
      username,
      url: data.url ?? `https://lichess.org/@/${username}`,
      online: Boolean(data.online),
      ratings,
      puzzle: data.perfs?.puzzle?.rating,
      record,
      hoursPlayed: data.playTime?.total ? Math.round(data.playTime.total / 3600) : undefined,
    }
  } catch {
    return null
  }
}

export async function getLichessLive(): Promise<LichessLive> {
  const username = process.env.LICHESS_USERNAME
  if (!username) return { playing: false }

  try {
    const res = await fetch(
      `https://lichess.org/api/users/status?ids=${encodeURIComponent(username)}&withGameIds=true`,
      { headers: { Accept: 'application/json' }, cache: 'no-store' }
    )
    if (!res.ok) return { playing: false }

    const [status] = (await res.json()) as { playing?: boolean; playingId?: string }[]
    if (!status?.playing || !status.playingId) return { playing: false }

    return { playing: true, gameId: status.playingId }
  } catch {
    return { playing: false }
  }
}

function toChessComRating(mode: ChessComMode | undefined): ChessRating | undefined {
  if (!mode?.last) return undefined
  const wins = mode.record?.win ?? 0
  const losses = mode.record?.loss ?? 0
  const draws = mode.record?.draw ?? 0
  return {
    rating: mode.last.rating,
    best: mode.best?.rating,
    games: wins + losses + draws,
    wins,
    losses,
    draws,
  }
}

export async function getChessComStats(): Promise<ChessComStats | null> {
  const username = process.env.CHESSCOM_USERNAME
  if (!username) return null

  const base = `https://api.chess.com/pub/player/${username.toLowerCase()}`

  try {
    const [statsRes, profileRes] = await Promise.all([
      fetch(`${base}/stats`, { headers: CHESSCOM_HEADERS, next: { revalidate: REVALIDATE } }),
      fetch(base, { headers: CHESSCOM_HEADERS, next: { revalidate: REVALIDATE } }),
    ])

    if (!statsRes.ok) return null
    const data = await statsRes.json()
    const profile = profileRes.ok ? await profileRes.json() : null

    const ratings: ChessComStats['ratings'] = {
      bullet: toChessComRating(data.chess_bullet),
      blitz: toChessComRating(data.chess_blitz),
      rapid: toChessComRating(data.chess_rapid),
    }

    const played = Object.values(ratings).filter((r): r is ChessRating => Boolean(r))
    const record: ChessRecord | undefined = played.length
      ? {
          wins: played.reduce((sum, r) => sum + (r.wins ?? 0), 0),
          losses: played.reduce((sum, r) => sum + (r.losses ?? 0), 0),
          draws: played.reduce((sum, r) => sum + (r.draws ?? 0), 0),
        }
      : undefined

    return {
      username,
      url: profile?.url ?? `https://www.chess.com/member/${username}`,
      followers: profile?.followers,
      ratings,
      puzzle: data.tactics?.highest?.rating,
      puzzleRush: data.puzzle_rush?.best?.score,
      record,
    }
  } catch {
    return null
  }
}

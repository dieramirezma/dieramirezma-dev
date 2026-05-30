import type { LichessStats, ChessComStats } from '@/types'

export async function getLichessStats(): Promise<LichessStats | null> {
  const username = process.env.LICHESS_USERNAME
  if (!username) return null

  try {
    const res = await fetch(`https://lichess.org/api/user/${username}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null
    const data = await res.json()

    return {
      username,
      blitz: data.perfs?.blitz
        ? { rating: data.perfs.blitz.rating, games: data.perfs.blitz.games }
        : undefined,
      rapid: data.perfs?.rapid
        ? { rating: data.perfs.rapid.rating, games: data.perfs.rapid.games }
        : undefined,
      classical: data.perfs?.classical
        ? { rating: data.perfs.classical.rating, games: data.perfs.classical.games }
        : undefined,
    }
  } catch {
    return null
  }
}

export async function getChessComStats(): Promise<ChessComStats | null> {
  const username = process.env.CHESSCOM_USERNAME
  if (!username) return null

  try {
    const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null
    const data = await res.json()

    return {
      username,
      blitz: data.chess_blitz?.last
        ? {
            rating: data.chess_blitz.last.rating,
            games:
              data.chess_blitz.record.win +
              data.chess_blitz.record.loss +
              data.chess_blitz.record.draw,
            wins: data.chess_blitz.record.win,
            losses: data.chess_blitz.record.loss,
            draws: data.chess_blitz.record.draw,
          }
        : undefined,
      rapid: data.chess_rapid?.last
        ? {
            rating: data.chess_rapid.last.rating,
            games:
              data.chess_rapid.record.win +
              data.chess_rapid.record.loss +
              data.chess_rapid.record.draw,
            wins: data.chess_rapid.record.win,
            losses: data.chess_rapid.record.loss,
            draws: data.chess_rapid.record.draw,
          }
        : undefined,
      bullet: data.chess_bullet?.last
        ? {
            rating: data.chess_bullet.last.rating,
            games:
              data.chess_bullet.record.win +
              data.chess_bullet.record.loss +
              data.chess_bullet.record.draw,
            wins: data.chess_bullet.record.win,
            losses: data.chess_bullet.record.loss,
            draws: data.chess_bullet.record.draw,
          }
        : undefined,
    }
  } catch {
    return null
  }
}

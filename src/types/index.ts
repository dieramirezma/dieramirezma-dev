export type Locale = 'en' | 'es'

export interface NowPlayingData {
  isPlaying: boolean
  title?: string
  artist?: string
  albumArt?: string
  songUrl?: string
  playedAt?: string
}

export type SpotifyRange = 'short_term' | 'medium_term' | 'long_term'

export interface SpotifyTrack {
  title: string
  artist: string
  albumArt?: string
  url: string
}

export interface SpotifyArtist {
  name: string
  image?: string
  url: string
}

export interface SpotifyTopData {
  tracks: SpotifyTrack[]
  artists: SpotifyArtist[]
}

export interface ChessRating {
  rating: number
  games: number
  wins?: number
  losses?: number
  draws?: number
  progress?: number
  best?: number
}

export interface ChessRecord {
  wins: number
  losses: number
  draws: number
}

export type ChessMode = 'bullet' | 'blitz' | 'rapid' | 'classical'

export interface LichessStats {
  username: string
  url: string
  online: boolean
  ratings: Partial<Record<ChessMode, ChessRating>>
  puzzle?: number
  record?: ChessRecord
  hoursPlayed?: number
}

export interface ChessComStats {
  username: string
  url: string
  followers?: number
  ratings: Partial<Record<Exclude<ChessMode, 'classical'>, ChessRating>>
  puzzle?: number
  puzzleRush?: number
  record?: ChessRecord
}

export interface Project {
  slug: string
  title: string
  description: string
  stack: string[]
  href?: string
  image?: string
  featured?: boolean
}

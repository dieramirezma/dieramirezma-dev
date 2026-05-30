export type Locale = 'en' | 'es'

export interface NowPlayingData {
  isPlaying: boolean
  title?: string
  artist?: string
  albumArt?: string
  songUrl?: string
}

export interface ChessRating {
  rating: number
  games: number
  wins?: number
  losses?: number
  draws?: number
}

export interface LichessStats {
  username: string
  blitz?: ChessRating
  rapid?: ChessRating
  classical?: ChessRating
}

export interface ChessComStats {
  username: string
  blitz?: ChessRating
  rapid?: ChessRating
  bullet?: ChessRating
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

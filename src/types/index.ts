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

export interface LichessLive {
  playing: boolean
  gameId?: string
}

export interface LichessGamePlayer {
  name: string
  rating?: number
}

export interface LichessGameState {
  fen: string
  white: LichessGamePlayer
  black: LichessGamePlayer
  lastMove?: string
  whiteClock?: number
  blackClock?: number
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

export type Localized<T> = Record<Locale, T>

export type DiagramName = 'multi-market' | 'payments' | 'services' | 'lifecycle' | 'realtime'

export type DiagramScope = 'conceptual' | 'deployed'

export interface ProjectLink {
  label: Localized<string>
  href: string
}

export interface ProjectImage {
  src: string
  width: number
  height: number
  alt: Localized<string>
}

export interface Project {
  slug: string
  title: string
  featured?: boolean
  diagram: DiagramName
  diagramScope?: DiagramScope
  image?: ProjectImage
  year: string
  stack: string[]
  context: Localized<string>
  summary: Localized<string>
  role: Localized<string>
  problem: Localized<string>
  approach: Localized<string>
  highlights: Localized<string[]>
  outcome?: Localized<string>
  links: ProjectLink[]
}

export interface AlsoProject {
  title: string
  year: string
  context: Localized<string>
  stack: string[]
}

import type {
  NowPlayingData,
  SpotifyArtist,
  SpotifyRange,
  SpotifyTopData,
  SpotifyTrack,
} from '@/types'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_URL = 'https://api.spotify.com/v1'

interface RawArtist {
  name: string
  images?: { url: string }[]
  external_urls: { spotify: string }
}

interface RawTrack {
  name: string
  artists: { name: string }[]
  album: { images: { url: string }[] }
  external_urls: { spotify: string }
}

let cachedToken: { value: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials')
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Spotify token request failed: ${res.status}`)

  const data = (await res.json()) as { access_token: string; expires_in: number }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 }
  return data.access_token
}

async function spotifyGet(path: string, revalidate?: number): Promise<Response> {
  const token = await getAccessToken()
  return fetch(`${SPOTIFY_API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    ...(revalidate ? { next: { revalidate } } : { cache: 'no-store' as const }),
  })
}

function toTrack(raw: RawTrack): SpotifyTrack {
  return {
    title: raw.name,
    artist: raw.artists.map(a => a.name).join(', '),
    albumArt: raw.album.images[1]?.url ?? raw.album.images[0]?.url,
    url: raw.external_urls.spotify,
  }
}

function toArtist(raw: RawArtist): SpotifyArtist {
  return {
    name: raw.name,
    image: raw.images?.[2]?.url ?? raw.images?.[0]?.url,
    url: raw.external_urls.spotify,
  }
}

async function getLastPlayed(): Promise<NowPlayingData> {
  const res = await spotifyGet('/me/player/recently-played?limit=1')
  if (!res.ok) return { isPlaying: false }

  const data = (await res.json()) as { items?: { track: RawTrack; played_at: string }[] }
  const item = data.items?.[0]
  if (!item) return { isPlaying: false }

  const track = toTrack(item.track)
  return {
    isPlaying: false,
    title: track.title,
    artist: track.artist,
    albumArt: track.albumArt,
    songUrl: track.url,
    playedAt: item.played_at,
  }
}

export async function getNowPlaying(): Promise<NowPlayingData> {
  try {
    const res = await spotifyGet('/me/player/currently-playing')

    if (res.status === 200) {
      const data = (await res.json()) as { is_playing: boolean; item: RawTrack | null }
      if (data.item && data.is_playing) {
        const track = toTrack(data.item)
        return {
          isPlaying: true,
          title: track.title,
          artist: track.artist,
          albumArt: track.albumArt,
          songUrl: track.url,
        }
      }
    }

    return await getLastPlayed()
  } catch {
    return { isPlaying: false }
  }
}

export async function getTopStats(range: SpotifyRange): Promise<SpotifyTopData | null> {
  try {
    const [tracksRes, artistsRes] = await Promise.all([
      spotifyGet(`/me/top/tracks?time_range=${range}&limit=5`, 3600),
      spotifyGet(`/me/top/artists?time_range=${range}&limit=5`, 3600),
    ])

    if (!tracksRes.ok || !artistsRes.ok) return null

    const tracks = (await tracksRes.json()) as { items: RawTrack[] }
    const artists = (await artistsRes.json()) as { items: RawArtist[] }

    return { tracks: tracks.items.map(toTrack), artists: artists.items.map(toArtist) }
  } catch {
    return null
  }
}

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'i.scdn.co' },
      { hostname: 'lichess.org' },
      { hostname: 'api.chess.com' },
    ],
  },
}

export default withNextIntl(nextConfig)

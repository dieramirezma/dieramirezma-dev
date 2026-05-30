# dieramirezma.dev

Personal portfolio of Diego Nicolas Ramirez Maldonado — software developer specializing in scalable interfaces and performance architecture.

**Live site:** [dieramirezma.dev](https://dieramirezma.dev)

---

## Stack

| Layer         | Technology                             |
| ------------- | -------------------------------------- |
| Framework     | Next.js 16 (App Router)                |
| Language      | TypeScript — strict mode               |
| Styles        | Tailwind CSS v4                        |
| Animations    | Framer Motion                          |
| Data fetching | TanStack Query v5                      |
| Fonts         | Geist + JetBrains Mono via `next/font` |
| i18n          | next-intl (EN / ES)                    |
| Theming       | next-themes (dark default)             |
| Deploy        | Vercel                                 |

## Features

- **Void aesthetic design system** — "Kinetic Technical": black canvas, electric blue (`#3b82f6`) accents, tight typography
- **Dark / Light mode** — dark by default, persisted in `localStorage`
- **Internationalization** — full EN / ES toggle via next-intl
- **Live Spotify integration** — now-playing widget polling every 30s
- **Chess stats** — live Lichess and Chess.com ratings via public APIs
- **Scroll animations** — Framer Motion `fadeInUp` on viewport entry, respects `prefers-reduced-motion`
- **Pre-commit formatting** — Prettier via lint-staged on every commit
- **Pre-push linting** — ESLint + TypeScript validation via Husky

## Project structure

```
src/
├── app/
│   ├── [locale]/          # i18n routing (next-intl)
│   │   ├── layout.tsx
│   │   └── page.tsx       # Home
│   └── api/
│       ├── spotify/now-playing/
│       └── chess/{lichess,chesscom}/
├── components/
│   ├── layout/            # Navbar, Footer, ThemeToggle
│   ├── home/              # Hero, LiveMetrics, SelectedWorks
│   └── ui/                # Chip, SectionTitle, Divider
├── hooks/                 # use-now-playing, use-chess-stats
├── lib/                   # spotify.ts, chess.ts, utils.ts
├── types/                 # Shared TypeScript interfaces
└── messages/              # en.json, es.json
```

## Getting started

```bash
pnpm install
cp .env.example .env.local  # fill in your credentials
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```env
# Spotify (Authorization Code flow)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Chess
LICHESS_USERNAME=
CHESSCOM_USERNAME=

# AI Chatbot (optional)
ANTHROPIC_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://dieramirezma.dev
```

## Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint + TypeScript check
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

## Code conventions

- **No `any`** — TypeScript strict, all types in `src/types/index.ts`
- **No semicolons** — Prettier enforces `"semi": false`
- **Single quotes** in TS/JS, double quotes in JSX attributes
- **Absolute imports** via `@/` alias, never relative `../../`
- **No barrel `index.ts`** unless the directory has 4+ related exports
- **No unnecessary comments** — code is self-documenting

---

© 2024 Diego Nicolas Ramirez Maldonado

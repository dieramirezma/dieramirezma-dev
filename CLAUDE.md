# CLAUDE.md — dieramirezma.dev

Guía completa para construir el portfolio personal de Diego Ramirez desde cero. Otro agente puede leer este archivo y tener todo el contexto necesario para implementar el proyecto.

---

## 1. Visión general

Portfolio personal de desarrollador de software con estética técnica, minimalista y oscura ("Void aesthetic"). Incluye integraciones en tiempo real con Spotify, Lichess y Chess.com. Soporta modo oscuro y claro con un design system propio llamado **Kinetic Technical**.

**URL objetivo:** `dieramirezma.dev`  
**Nombre del sitio en UI:** `DNRM` (logo/header) o `DEV/VOID` (variante alternativa)  
**Autor:** Diego Nicolas Ramirez Maldonado  
**Idiomas:** Español e Inglés (i18n con toggle EN/ES)

---

## 2. Tech Stack

| Capa                 | Tecnología                                                   |
| -------------------- | ------------------------------------------------------------ |
| Framework            | Next.js 15 (App Router)                                      |
| Lenguaje             | TypeScript — strict mode                                     |
| Estilos              | Tailwind CSS v4 (CSS-first config, sin `tailwind.config.js`) |
| Iconos               | Lucide React                                                 |
| HTTP / Data fetching | TanStack Query v5 (`@tanstack/react-query`)                  |
| AI features          | Vercel AI SDK (`ai` + `@ai-sdk/react`)                       |
| Animaciones          | Framer Motion                                                |
| Fuentes              | `next/font` — Geist + JetBrains Mono                         |
| Deploy               | Vercel                                                       |

### Dependencias clave

```bash
pnpm add next@15 react react-dom typescript
pnpm add tailwindcss@4 @tailwindcss/vite
pnpm add lucide-react
pnpm add @tanstack/react-query
pnpm add ai @ai-sdk/react @ai-sdk/anthropic
pnpm add framer-motion
pnpm add next-themes
pnpm add next-intl
```

---

## 3. Estructura de directorios

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Home
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── uses/
│   │   │   └── page.tsx
│   │   ├── labs/
│   │   │   └── page.tsx
│   │   └── projects/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── api/
│   │   ├── spotify/
│   │   │   └── now-playing/route.ts
│   │   ├── chess/
│   │   │   ├── lichess/route.ts
│   │   │   └── chesscom/route.ts
│   │   └── chat/route.ts            # AI chatbot (Vercel AI SDK)
│   └── layout.tsx                   # Root layout
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── theme-toggle.tsx
│   ├── home/
│   │   ├── hero.tsx
│   │   ├── tech-stack.tsx
│   │   ├── selected-works.tsx
│   │   ├── now-playing.tsx
│   │   └── chess-stats.tsx
│   ├── about/
│   │   ├── profile-hero.tsx
│   │   ├── skills-section.tsx
│   │   ├── personal-interests.tsx
│   │   └── reading-list.tsx
│   ├── uses/
│   │   ├── uses-category.tsx
│   │   └── use-item.tsx
│   ├── labs/
│   │   └── lab-card.tsx
│   └── ui/
│       ├── chip.tsx
│       ├── project-card.tsx
│       ├── section-title.tsx
│       └── divider.tsx
├── lib/
│   ├── spotify.ts
│   ├── chess.ts
│   └── utils.ts
├── hooks/
│   ├── use-now-playing.ts
│   └── use-chess-stats.ts
├── types/
│   └── index.ts
└── messages/
    ├── en.json
    └── es.json
```

---

## 4. Design System — "Kinetic Technical"

### 4.1 Filosofía

- **Void aesthetic:** fondos negros absolutos como lienzo para tipografía blanca y acentos azules eléctricos.
- **Corporate / Modern + Minimalism:** sin decoración innecesaria, cada elemento es funcional.
- **Profundidad por capas tonales**, no por sombras.
- **Precisión matemática:** grid de 12 columnas, unidad base de 4px.

### 4.2 Paleta — Modo Oscuro (Dark)

```css
/* Backgrounds / Surfaces */
--color-bg: #000000; /* Canvas principal */
--color-surface-1: #0a0a0a; /* Cards, secciones */
--color-surface-2: #171717; /* Modales, tooltips, dropdowns */
--color-surface-3: #10131a; /* Variante azulada profunda */

/* Borders */
--color-border: #27272a; /* Bordes estándar */
--color-border-hover: #a1a1aa; /* Bordes en hover */

/* Typography */
--color-text-primary: #ffffff; /* Contenido principal */
--color-text-secondary: #a1a1aa; /* Metadata, descripciones */
--color-text-muted: #71717a; /* Placeholders, disabled */

/* Accent — Electric Blue */
--color-primary: #3b82f6; /* Acción, highlight, focus */
--color-primary-hover: #60a5fa; /* Hover state */
--color-primary-dim: #1d4ed8; /* Pressed state */

/* Semantic */
--color-error: #ef4444;
--color-success: #22c55e;
--color-warning: #f59e0b;
```

### 4.3 Paleta — Modo Claro (Light)

```css
/* Backgrounds / Surfaces */
--color-bg: #ffffff;
--color-surface-1: #f4f4f5; /* Cards, secciones */
--color-surface-2: #e4e4e7; /* Modales, overlays */
--color-surface-3: #f0f4ff; /* Variante azulada suave */

/* Borders */
--color-border: #d4d4d8;
--color-border-hover: #71717a;

/* Typography */
--color-text-primary: #09090b;
--color-text-secondary: #52525b;
--color-text-muted: #a1a1aa;

/* Accent — mismo Electric Blue */
--color-primary: #3b82f6;
--color-primary-hover: #2563eb;
--color-primary-dim: #1d4ed8;

/* Semantic */
--color-error: #dc2626;
--color-success: #16a34a;
--color-warning: #d97706;
```

### 4.4 Implementación con Tailwind v4 + next-themes

En `app/globals.css`:

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Geist', ui-sans-serif, system-ui;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing */
  --spacing-unit: 4px;
  --container-max: 1200px;
}

:root {
  --color-bg: #ffffff;
  --color-surface-1: #f4f4f5;
  --color-surface-2: #e4e4e7;
  --color-surface-3: #f0f4ff;
  --color-border: #d4d4d8;
  --color-border-hover: #71717a;
  --color-text-primary: #09090b;
  --color-text-secondary: #52525b;
  --color-text-muted: #a1a1aa;
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
}

.dark {
  --color-bg: #000000;
  --color-surface-1: #0a0a0a;
  --color-surface-2: #171717;
  --color-surface-3: #10131a;
  --color-border: #27272a;
  --color-border-hover: #a1a1aa;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
  --color-primary: #3b82f6;
  --color-primary-hover: #60a5fa;
}
```

### 4.5 Tipografía

| Rol                | Fuente         | Tamaño | Peso | Letter spacing |
| ------------------ | -------------- | ------ | ---- | -------------- |
| Display            | Geist          | 64px   | 700  | -0.04em        |
| Headline LG        | Geist          | 48px   | 600  | -0.03em        |
| Headline LG Mobile | Geist          | 32px   | 600  | normal         |
| Headline MD        | Geist          | 24px   | 600  | normal         |
| Body LG            | Geist          | 18px   | 400  | normal         |
| Body MD            | Geist          | 16px   | 400  | normal         |
| Label / Chip       | JetBrains Mono | 13px   | 500  | 0.02em         |
| Code               | JetBrains Mono | 14px   | 400  | normal         |

### 4.6 Bordes y shapes

```
Botones / Inputs:         border-radius: 4px  (0.25rem)
Cards / Imágenes grandes: border-radius: 8px  (0.5rem)
Chips / status:           border-radius: 9999px (pill)
```

### 4.7 Elevación (solo dark mode — por capas tonales)

| Nivel       | Color                        | Uso                          |
| ----------- | ---------------------------- | ---------------------------- |
| 0 — Base    | `#000000`                    | Background principal         |
| 1 — Surface | `#0a0a0a` + border `#27272a` | Cards, secciones             |
| 2 — Overlay | `#171717` + border `#27272a` | Modales, tooltips, dropdowns |

Las sombras son ambientales, muy difusas y solo en el nivel más alto (Command Palette, modales flotantes).

### 4.8 Espaciado

```
unit:             4px
stack-sm:         8px
stack-md:         16px
stack-lg:         32px
stack-xl:         64px
gutter:           24px
container-max:    1200px
margin-desktop:   40px
margin-mobile:    16px
```

---

## 5. Componentes UI base

### Chip

```tsx
// Monospaced, bordered, para technology tags
<span className="font-mono text-xs border border-[var(--color-border)] px-2 py-0.5 rounded-full text-[var(--color-text-secondary)]">
  React
</span>
```

### Botones

- **Primary:** `bg-white text-black` (dark) / `bg-black text-white` (light). Hover: leve overlay blanco 5%.
- **Secondary:** `transparent` + `border border-[var(--color-border)]`. Hover: border brilla levemente.
- **Ghost:** sin borde, underline en hover.

### Cards

- Sin sombras. Fondo `var(--color-surface-1)`, border `1px solid var(--color-border)`.
- Hover: border → `var(--color-border-hover)`, transición 200ms.

### Inputs

- Fondo `var(--color-surface-1)`, border `1px`. Focus: border → `#3b82f6`, sin glow exterior.

### Dividers

- `1px solid var(--color-border)`. Uso esparso, solo para separar secciones lógicas.

---

## 6. Páginas

### 6.1 Home (`/`)

**Secciones en orden:**

1. **Navbar** — Logo `DNRM`, links: Projects, Experience, About, Labs. Toggle idioma EN/ES, toggle dark/light mode.
2. **Hero** — Nombre del autor, tagline (ej: "2+ years building scalable interfaces"), credenciales (hackathon winner). Avatar pixel art. CTA buttons.
3. **TechStack** — Dos columnas: Frontend y Backend. Frontend: Next.js 15, TypeScript, React, Tailwind CSS, TanStack Query. Backend: Python, FastAPI, Django, Go, PostgreSQL.
4. **Now Playing** — Widget de Spotify con canción actual. Animación de barras si hay música activa.
5. **Chess Stats** — Métricas de Lichess / Chess.com: rating, partidas recientes, winrate.
6. **Selected Works** — Grid de 4 proyectos destacados con imagen, título, descripción corta, stack chips, link.
7. **Footer** — Copyright, social links (GitHub, LinkedIn, Twitter, Email), créditos de stack.

### 6.2 About (`/about`)

**Secciones en orden:**

1. **ProfileHero** — Foto de perfil real, nombre completo, título profesional.
2. **SkillsSection** — Chips de skills: TypeScript, React, Node.js, Python, Go.
3. **PersonalInterests** — Tres bloques con icono: Fotografía, Café especializado, Viajes.
4. **ReadingList** — Lista curada de libros con portada, título, autor, reseña corta, rating de estrellas.
5. **Footer** — Igual que Home.

### 6.3 Uses (`/uses`)

**Secciones en orden:**

1. **Header** — Título "Uses", descripción: "A curated list of the hardware, software, and tools I use daily for software development and design."
2. **Setup Image** — Foto del setup de trabajo.
3. **Hardware** — MacBook Pro M3 Max, Dell UltraSharp 32", Keychron Q1, Logitech MX Master 3S.
4. **Software** — VS Code, Warp Terminal, Arc Browser, Slack, Spotify, Figma.
5. **Coding Environment** — Tema: Tokyo Night Storm. Fuentes: Geist Mono / JetBrains Mono. Shell: Zsh.
6. **Footer**.

### 6.4 Labs (`/labs`)

**Secciones en orden:**

1. **Header** — Título "Labs", descripción: "Playground para experimentos técnicos, prototipos y fragmentos de código abierto."
2. **Projects Grid** — Grid de tarjetas. Cada tarjeta tiene: título del experimento, categoría (chip), link "View Source ↗".

**Proyectos ejemplo en Labs:**

- Neptune Fluid Physics (CSS Animation)
- LLM Context Pruner (AI Prompt)
- Concurrent Go Crawler (Go Script)
- React Portals Demo (Frontend)
- Zero-Knowledge Proof Mock (Security)
- Custom Tailwind Plugin (Tooling)

---

## 7. Navegación global

```
/ (Home)
/about
/uses
/labs
/projects/[slug]   (detalle de proyecto)
```

**Navbar activo state:** El link de la página actual se muestra con `color-primary` (#3b82f6).

---

## 8. Internacionalización (i18n)

- Usar `next-intl` con `[locale]` en el App Router.
- Locales: `en` (default), `es`.
- Toggle visible en navbar: `EN | ES`.
- Traducir: títulos de página, textos de navegación, descripciones, footer.
- No traducir: nombres propios, nombres de tecnologías, nombres de proyectos.

---

## 9. Dark / Light Mode

- Usar `next-themes` con `defaultTheme="dark"` y `attribute="class"`.
- El toggle en navbar usa `ThemeToggle.tsx` con ícono de Lucide (`Sun` / `Moon`).
- El diseño primario es **dark**. El light mode es una variante limpia y coherente, no una inversión simple.
- Persistir preferencia en `localStorage`.

---

## 10. Integración Spotify

### API Route: `/api/spotify/now-playing`

```typescript
// lib/spotify.ts
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'

// Variables de entorno requeridas:
// SPOTIFY_CLIENT_ID
// SPOTIFY_CLIENT_SECRET
// SPOTIFY_REFRESH_TOKEN
```

**Flujo:**

1. Usar refresh token para obtener access token (Client Credentials + PKCE no aplica aquí, usar Authorization Code flow).
2. Llamar a `/v1/me/player/currently-playing`.
3. Devolver: `{ isPlaying, title, artist, albumArt, songUrl }`.

**Componente NowPlaying:**

- Si `isPlaying = true`: mostrar barras animadas + datos de canción.
- Si `isPlaying = false`: mostrar "Not playing" o última canción.
- Polling cada 30 segundos con TanStack Query (`refetchInterval: 30000`).

### Variables de entorno

```env
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

---

## 11. Integración Chess

### Lichess API Route: `/api/chess/lichess`

```typescript
// GET https://lichess.org/api/user/{username}
// No requiere auth para datos públicos
// Variables de entorno:
// LICHESS_USERNAME=dieramirezma (o el username real)
```

**Datos a mostrar:** rating Blitz / Rapid / Classical, partidas jugadas, streak.

### Chess.com API Route: `/api/chess/chesscom`

```typescript
// GET https://api.chess.com/pub/player/{username}/stats
// No requiere auth para datos públicos
// Variables de entorno:
// CHESSCOM_USERNAME=
```

**Datos a mostrar:** rating, win/loss/draw counts.

**Componente ChessStats:**

- Tabs o toggle Lichess / Chess.com.
- Cards con rating por tiempo de control.
- Winrate progress bar.
- Revalidación ISR cada 1 hora o bajo demanda.

### Variables de entorno

```env
LICHESS_USERNAME=
CHESSCOM_USERNAME=
```

---

## 12. Variables de entorno completas

```env
# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Chess
LICHESS_USERNAME=
CHESSCOM_USERNAME=

# AI Chatbot (opcional)
ANTHROPIC_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://dieramirezma.dev
```

---

## 13. SEO y Metadata

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Diego Ramirez — Software Developer',
    template: '%s | Diego Ramirez',
  },
  description:
    'Software developer specializing in scalable interfaces and performance architecture.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dieramirezma.dev',
    siteName: 'Diego Ramirez',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@dieramirezma',
  },
}
```

---

## 14. Animaciones

- Usar **Framer Motion** para:
  - Entrada de secciones: `fadeInUp` al hacer scroll (viewport trigger).
  - Hover en cards: `scale(1.01)` + border color transition.
  - NowPlaying: barras de ecualizador animadas cuando `isPlaying = true`.
  - Page transitions: fade suave entre rutas.
- Respetar `prefers-reduced-motion`.

```typescript
// Variante base para entrada de secciones
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
```

---

## 15. Performance y buenas prácticas

- Usar `next/image` para todas las imágenes con `sizes` apropiados.
- Usar `next/font` para Geist y JetBrains Mono (no CDN externo).
- Las rutas de API de Chess usan ISR / `revalidate` de 3600 segundos.
- La ruta de Spotify no usa cache (siempre fresca).
- No usar `"use client"` a menos que sea necesario (hooks, interactividad).
- Preferir Server Components para secciones estáticas.

---

## 16. Setup inicial

```bash
pnpm dlx create-next-app@latest dieramirezma-dev \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd dieramirezma-dev

pnpm add lucide-react framer-motion next-themes next-intl
pnpm add @tanstack/react-query
pnpm add ai @ai-sdk/react @ai-sdk/anthropic

# ESLint + Prettier
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Configurar `next.config.ts`:

```typescript
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'i.scdn.co' }, // Spotify album art
      { hostname: 'lichess.org' },
      { hostname: 'api.chess.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
```

---

## 17. ESLint y Prettier

### Prettier

Crear `.prettierrc` en la raíz:

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "trailingComma": "es5",
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

Crear `.prettierignore`:

```
.next
node_modules
pnpm-lock.yaml
public
```

### ESLint (flat config — Next.js 15 usa ESLint 9)

Reemplazar el `eslint.config.mjs` generado por `create-next-app` con:

```js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettierConfig,
  {
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // React
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]

export default eslintConfig
```

### Scripts en `package.json`

Asegurarse de que existan estos scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Reglas clave

- **Sin punto y coma** — Prettier lo aplica automáticamente con `"semi": false`.
- **Comillas simples** en JS/TS, dobles en JSX (comportamiento por defecto de Prettier en JSX).
- **Sin `any`** — error de compilación, no advertencia.
- **`no-console`** — solo `console.warn` y `console.error` permitidos.
- **Type imports** — usar `import type { Foo }` cuando el import es solo de tipos.
- **`prefer-const`** — nunca `let` si la variable no se reasigna.

---

## 18. Convenciones de código

- **TypeScript strict:** nunca usar `any`, definir tipos en `src/types/index.ts`.
- **Componentes:** el nombre del componente (export) en PascalCase, pero el **archivo en lowercase con guiones** (ej: `hero.tsx`, `tech-stack.tsx`, `now-playing.tsx`).
- **Hooks:** prefijo `use`, archivo en lowercase con guiones (ej: `use-now-playing.ts`, `use-chess-stats.ts`), en `src/hooks/`.
- **Sin comentarios innecesarios:** el código debe ser autoexplicativo.
- **Sin barrel exports** (`index.ts`) a menos que el directorio tenga 4+ componentes relacionados.
- **Imports:** absolute con alias `@/` (nunca paths relativos con `../../`).

---

## 19. Referencias visuales (Screenshots de Stitch)

Estas imágenes son la fuente de verdad del diseño. El agente implementador **debe usarlas como referencia visual directa** para respetar layout, proporciones, jerarquía y composición de cada página.

| Página               | URL de screenshot                                                                                                                                                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home v2**          | `https://lh3.googleusercontent.com/aida/ADBb0ugxkzvRGXj3QVHKBilWGKAMULt9UUmhhX54pPk8wP2X65qdQxPd8InxTy5iDSvXtonZ3SmcGc57-CR8EHG2xRpFc5cU-4Wz3_x5FaE9PU-N3iwbevs7hfyeiPnFnrmyE2a_D2EPZBoHEdUbfRCSlkzXPljsE9k9mNi03Vqc6EHJUvLMiFXaVwZVdJBZWRRJNgXwBScctI-WSSefuEwANvbJz--qwGYgg9fkCRhwk_Nt291FZhcMn7BVjbMJ` |
| **About Me**         | `https://lh3.googleusercontent.com/aida/ADBb0uiNLCkoItmWahR6dF1H7KRxEaMbyf4aJ5aL7mlAyAJas3JPa8JdbG8bBoehv5ULlZiuk604Jp4BszKiD9Uqv3UaS8nw71O9AuwIlmQCfa89ziUYSwqvKSTKnEg-UxL5iWDMfsQ2sS8UY4R_AvDbufZKs40ZSm1nT1od3Rrophb54sBQf4E79V2d9w17etvQcQufiNiCm-RHwmhpuRFVbmANL-Sp45NsP6afd7LMZl-i99wHMZD-YSXYq636` |
| **Uses**             | `https://lh3.googleusercontent.com/aida/ADBb0ujHDHqgdhusW6rVQqmVHfU-kAqkbReNFHX__08Ec_ko5dl7vxND0w_A_eapDXa2AYtkEc75l2AIS2ckE04QNmLnPVo1eYXTYm-WVsaeMzIf1_PiwznM-wlw91g6ZtkHGax5ukW2_BD0zstWjkCG4cQXn6lxdqCUFkfzMqRQxGd6nP74lfk5faKVVFNtFKNeHk-F4jUTGg2Yiw6WslS8wwIUW6LdnKOXl53uEHXWVMVQ58Q4Vef2-s9WheCq` |
| **Labs**             | `https://lh3.googleusercontent.com/aida/ADBb0uhh1bkv3sgvEBSGinmCb9VE5fym6eNP04z2VDbJ4_NszOjSalm0E1DAVjB-Qj86IwumZ7oxgUrFVDit6kf3a3VCSjaCpX_9LJPrqbyHzyM1vl0SSpT7MarJaooDL4vqSJ3TG1UvRLJUFAh8F032ELUHJPH62vw5qCGMq9A8KvGagH2JEysOPMWdiMLRxlBanwnP5g0vbZPvsPaYBAzay6eEcc2laEQn5b78gU1HrqbqGhv6tiIVV-7gkFGi` |
| **Avatar pixel art** | `https://lh3.googleusercontent.com/aida/ADBb0ugYyRajh9ewJ4Q-YfuiOoM-omYfs9QxTVup7SjRG-oqpPeEAqTj3D66RJoCNb3UxFwE_nQqGw9fQhvXoFHLkzZU3lALHJ2zyFkw5gdXOlZdWKXHtlZrxFZMFBl93U2QOfAeMikSNCjIimaYmG0vBp75yqHPOo7eP5wWHLRdTLgnzw8kfgKhkm2hFwRmJTFDIht4ih-rQxdt6aPbzBO2S7gdWQK85g5aH5uGuN4`                      |

**Instrucción al agente:** antes de implementar cada página, carga la screenshot correspondiente con una herramienta de lectura de imágenes o WebFetch y úsala como referencia de layout. Prioriza reproducir fielmente la composición visual: distribución de columnas, jerarquía tipográfica, espaciado entre secciones y posición de elementos clave (avatar, cards, widgets).

---

## 20. Notas del diseño original (Stitch)

- El proyecto en Stitch se llama **"Diego Ramirez Developer Portfolio"** (`projects/10017375829143668801`).
- Design system: **Kinetic Technical** — dark, Geist + JetBrains Mono, azul eléctrico `#3b82f6`.
- Las pantallas disponibles son: Home v2, About Me, Uses, Labs.
- El avatar del autor es pixel art estilo 32-bit RPG, escala de grises.
- El logo en algunas variantes aparece como `DEV/VOID` (Labs) o `DNRM` (Home/About).
- Footer copyright: "© 2024 Diego Nicolas Ramirez Maldonado".

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters (10–20 second scan), engineering managers and technical interviewers (2–5 minutes, looking for technical decisions, architecture, trade-offs, personal contribution), and startup founders / hiring managers. They are evaluating Diego for Software Engineer, Full Stack Engineer or Frontend Engineer roles, Colombia first, then LATAM / international remote.

Secondary, longer term: readers of a future personal blog and visitors who want to know Diego as a person beyond his résumé.

## Product Purpose

Personal website of Diego Nicolás Ramírez (dieramirezma.dev). Today its main job is getting him hired: a visitor should understand within about 15 seconds who he is, what he is strongest at, that he has real production experience, what he has accomplished, how to verify it, and how to contact him. It is intended to grow into a broader personal website with a blog and more about him as a person. Success is a visitor concluding: a Software Engineer with a strong React/Next.js/TypeScript foundation, production multi-country SaaS experience, full-stack and cloud capability, and not a student listing every technology he has touched.

## Positioning

"Software Engineer | React · Next.js · TypeScript | Full-Stack with Python/Django · AWS", grounded in evidence (a led 3-repo to feature-flag consolidation, 100+ automated tests, real payments work) rather than adjectives. A strong frontend specialization with real full-stack and cloud experience, plus live personal signals (Spotify, chess) that show the person behind the work.

## Operating Context

- Bilingual: English default, Spanish via `next-intl` (`[locale]` routing, EN/ES toggle). Proper names, technology names and project names are not translated.
- Dark and light mode (`next-themes`, dark default).
- Live integrations: Spotify now-playing, Lichess and Chess.com stats, live Lichess board.
- Résumé PDFs in `public/` (EN primary, ES secondary).
- Deployed on Vercel. Stack: Next.js (App Router), TypeScript strict, Tailwind v4, Framer Motion, TanStack Query.
- Full factual and copy reference: `diego_ramirez_portfolio_source_of_truth.md`.

## Capabilities and Constraints

- Current role: Software Engineer at Dapper (Jan 2025 to present), B2B SaaS across 10+ Latin American markets. Also Freelance Full-Stack Developer (Jan 2024 to present). Based in Bogotá, Colombia.
- Education: Systems and Computing Engineering, Universidad Nacional de Colombia, graduated 2026, GPA 4.5/5.0. Never presented as a student.
- Approved public metrics only: 3 repositories, 1 month, 3 → 10+ markets, about 6 months, 100+ automated tests, 10+ Latin American markets. Do not invent others.
- Confidentiality: no Dapper internal repo names, URLs, architecture diagrams, source or unapproved metrics. Dapper is described at a high level only: no coverage percentage, no pipeline or vendor specifics, no platform-category wording beyond "B2B SaaS".
- Backend: Django is the primary backend technology. FastAPI is verified professional experience at Dapper, shown as a secondary backend technology and never as a hero skill. No claims about how it was used.
- Academic and team projects (FullStyle, FoodRadar, Gemalab hackathon 1st place) must be labeled as such, never as employment.
- No dead buttons or fake links: omit a link or project until real data exists. No personal phone number. Email, LinkedIn and GitHub are public.
- Do not claim: Senior title, Angular production experience, English B2/C1, skill percentages, "student" / "beginner" / "passionate" positioning.
- Planned, not yet built: personal blog and further personal/about content. Structure should leave room for both.

## Brand Commitments

Name: Diego Ramírez (full: Diego Nicolás Ramírez); logo wordmark is the serif "Diego Ramírez" (the `DNRM` and `DEV/VOID` variants from CLAUDE.md are not used). Public handle `dieramirezma`. Voice: professional English, restrained and technical, evidence over adjectives, no filler like "passionate developer".

## Evidence on Hand

- Approved experience bullets, skills tiers, education and copy bank in `diego_ramirez_portfolio_source_of_truth.md`.
- Résumés: `public/diego-ramirez-resume-en.pdf`, `public/diego-ramirez-resume-es.pdf`.
- Project content in `src/content/` and routes under `src/app/[locale]/projects/`.
- Project screenshots (add to `public/projects/` and set `image` in `src/content/projects.ts`, about 1600×1000 PNG/WebP). Bus Tracking has one per locale (`bus-tracking-en.png`, `bus-tracking-es.png`), captured from the live site with route H20 selected; recapture them if its interface changes again. Still requested: Dulce Berlín storefront or product page plus the Wompi checkout step; FullStyle booking/appointments screen plus dashboard; Gemalab traceability/lifecycle screen. Dapper gets none (confidential); its architecture diagram is the visual.
- FullStyle public monorepo (team project, modernized and consolidated by Diego, contributors credited): https://github.com/dieramirezma/fullstyle. Its README and `docs/architecture-review/` are the source for the case study and architecture diagram; the demo is local and synthetic, never a production deployment.
- Bus Tracking (personal project, solo, 2026): live at https://bus-tracking.dieramirezma.dev, public repo https://github.com/dieramirezma/bus-tracking. Its README, PRODUCT.md and DESIGN.md are the source for the case study and architecture diagram (interface: «transit diagram in enamel», route strip, ES/EN, no ETA by design); figures used (30 s / 15 s polling, ~180 KB → ~20 KB, 4,000+ vehicles, ~121 MB GTFS.zip, 578 MB stop_times) come from the README and code. Shown as a second featured project because it is the only one with a live URL.
- Absent and not to be fabricated: live URLs for FullStyle / Gemalab / FoodRadar, a FoodRadar repo, screenshots, user counts, conversion/revenue/Lighthouse numbers, RestauManage verification.

## Product Principles

1. Recruiter-first clarity: the 15-second scan answers who, strongest at what, production proof, how to verify, how to contact.
2. Evidence over decoration: concrete engineering outcomes outrank badges, logo walls and stats widgets.
3. Truth over polish: omit anything unverified; label context (professional, freelance, university, hackathon) honestly.
4. Personality is secondary and earned: Spotify, chess and future blog add human texture below the professional proof and never compete with it.
5. Depth on demand: managers can go deeper (case studies, trade-offs) without digging through decoration.

## Accessibility & Inclusion

Semantic headings in order, keyboard-accessible interactive elements, accessible contrast in both themes, `prefers-reduced-motion` respected, no horizontal overflow on mobile, meaningful image alt text.

## Resolved Decisions

Where CLAUDE.md (original build brief) and `diego_ramirez_portfolio_source_of_truth.md` overlap, verified facts and the source-of-truth doc win. CLAUDE.md stays authoritative only for engineering conventions (stack, file naming, lint rules).

1. **Hero and credentials.** No auto-updating or hardcoded years-of-experience claim. Use a concise, natural introduction based on verified experience (source doc copy bank). The hackathon result may appear only as the verified Gemalab entry, "Hackathon · 1st place" (2024), already in `src/content/projects.ts`. Never invent or inflate credentials.
2. **Navigation and IA.** Homepage order: Hero, Experience, Work, Capabilities (with About and education merged in), Contact, then a compact Activity strip (Spotify, chess) before the footer. Nav: Experience, Work, About, Contact. `/uses` and `/labs` are secondary destinations at most and do not exist yet. A technical blog is part of the product direction and is out of scope for this refinement.
3. **Copyright and branding.** The year is derived from the current date (already done in `src/components/layout/footer.tsx` via `new Date().getFullYear()`; no hardcoded year remains). The serif "Diego Ramírez" wordmark stays unless the design audit says otherwise.
4. **Technology stack.** Verified production work is the source of truth. Primary: React, Next.js, TypeScript. Full-stack: Python/Django, PostgreSQL, Node.js. Engineering: AWS, Docker, GitHub Actions, Vitest, TanStack Query. Secondary: FastAPI (verified at Dapper), Flask, Astro, Go, Kubernetes/GKE stay visibly lower in weight. No implied equal expertise. FastAPI is not shown in the hero.
   - **No headline statistics.** The "3 → 1 / 10+ / 100+" figures strip is removed and not replaced. Approved metrics may appear in running prose (for example the Dapper bullets).
5. **Visual direction.** Keep the dark editorial identity where it works. Move away from generic, over-stylized patterns toward restrained, authentic, product-engineering design. Avoid decorative statistics, filler labels, gratuitous animation and marketing language. CLAUDE.md's "Kinetic Technical" palette and type system are incumbent evidence, not a binding spec.
6. **X/Twitter.** Not shown in the UI today; only generic Twitter-card metadata exists. Add or keep an X link only if the account is valid and professionally relevant, and never prominently.
7. **RestauManage.** Preserve its content; do not feature it prominently without a clear reason.

## Unresolved Factual Conflicts and Uncertainty

- **`/uses` and `/labs` do not exist.** Only `/` and `/projects/[slug]` are implemented, so there is nothing to preserve. CLAUDE.md's placeholder content for them (hardware list, Labs examples) is unverified and must not ship without Diego's confirmation.
- **RestauManage is not in the repo** (source, content, messages). It appears only in the source-of-truth doc, so "keep it in the repository" has nothing to apply to yet. Where its content lives is unknown.
- **Gemalab link.** The 1st place is stated in the source doc and `src/content/projects.ts`, but the repo link is `hackathon-nacional-talento-tech`. Confirm it is the same event.
- **Hero wording.** The source doc's copy-bank replaces CLAUDE.md's "2+ years" line.
- **X/Twitter handle.** CLAUDE.md cites `@dieramirezma`; unverified and not rendered anywhere.
- **English proficiency label** and the full certification list remain unconfirmed per the source doc.
- **`DEV/VOID` logo variant** exists only in CLAUDE.md and is not adopted.

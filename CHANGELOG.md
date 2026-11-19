# Changelog

## Unreleased — og-preview

- **Link preview (Open Graph + Twitter Card).** `app/layout.tsx` now sets
  `metadataBase`, `openGraph` and `twitter` metadata (absolute
  `og:image`/`twitter:image` at `https://frynime.pages.dev/og-image.png`),
  so links pasted in WhatsApp/Telegram render a preview card.
- **`public/og-image.png` (1200x630).** Real screenshot of the landing hero,
  taken from a local static-export build (Jikan API is unreachable from the
  sandbox VM, so the trending-poster row renders its empty state — see
  `docs/testing.md`).

## v1.1.0 — 2026-11-18 (proper rebuild)

- **Static export for Cloudflare Pages.** `next.config.ts`: `output: 'export'`
  (was `standalone`), `images.unoptimized: true`. All data fetching moved
  from server components to a client-side Jikan client (`lib/api.ts`, replaces
  `lib/scraper.ts`): request queue (≥400 ms apart), one retry on 429, 10-min
  in-memory cache, honest empty/error states.
- **Fixed: 6 more dead footer links.** `/terms`, `/policy`, `/faq`, `/contact`,
  `/tv-shows`, `/ongoing` were linked from the footer since v0.1 but never
  existed (Next prefetched their flight payloads, producing 404s on every
  page load). They are real pages now: honest Terms / Privacy / FAQ / Contact
  pages, a TV-series list, and an ongoing-airing list. The dead `href="#"`
  social links were replaced with GitHub links.
- **Routes are query params now** (`/anime?id=`, `/episode?e=`, `/genre?g=`)
  because a static export cannot serve dynamic `[slug]` routes. All internal
  links updated (AnimeCard, detail, episode, genre chips, schedule).
- **Landing page (SaaS-style).** First visit shows a landing with sticky
  navbar + GitHub logo top-right, two-column hero with a live preview of the
  trending posters, feature grid, how-it-works, CTA band. `Mulai Nonton`
  stores `frynime-entered` in localStorage; returning visitors skip it.
- **GitHub link in the app chrome** too (sidebar footer + mobile top bar).
- **Removed 8 unused dependencies** (`@google/genai`, `axios`, `cheerio`,
  `motion`, `@hookform/resolvers`, `firebase-tools`, `@tailwindcss/typography`,
  `autoprefixer`) — none were imported anywhere. Removed the AI Studio
  leftovers: `.env.example` (GEMINI_API_KEY, never used), `metadata.json`
  (Gemini capability claim), the HMR webpack hack in `next.config.ts`,
  `.eslintrc.json` (duplicate of the flat config), committed
  `tsconfig.tsbuildinfo`.
- **Fixed the dead animation.** The navbar's `animate-in slide-in-from-top`
  classes come from `tw-animate-css`, which was installed but never imported
  — the animation did nothing. `globals.css` now imports it.
- **Loading + error states everywhere.** Skeletons while fetching; a clear
  error panel with retry when the Jikan API fails (rate limit / blocked
  connection) instead of an empty page.
- **CI** (`.github/workflows/ci.yml`): typecheck + lint + build + smoke test
  (`scripts/smoke.mjs` serves `out/` and checks all 12 routes).
- **Docs**: PRD, architecture, API, deployment, testing + SVG data-flow
  diagram (`docs/`). README rewritten honestly (Jikan limits, third-party
  stream, CORS dependency). Screenshots + silent video demo recorded from the
  live build.
- **Lint is now clean** (was 7 `react-hooks/set-state-in-effect` errors +
  1 unused disable directive).

## v0.1.0 — 2026-11-05 (baseline, as pushed)

Next.js 15 anime catalog on the Jikan API: home with hero + 11 sections,
detail, episode iframe, genres, schedule, search, localStorage favorites.
README claimed a video demo and a Netlify live link; the "video" was never
verified and the 4 list routes linked from home did not exist.

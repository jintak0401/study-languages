# Architecture

## Overview
A static-friendly Next.js (App Router) site. All study content is read from files under `content/` at build time, so the whole app prerenders to static HTML. Per-user state (streaks, known cards) lives only in the browser via Zustand `persist` (localStorage).

```
Browser ──renders──> Next.js pages (RSC, static)
                          │ read at build
                          ▼
                    content/*.json + content/logs/*.md   ← git-synced (edit + push = update)

Browser localStorage ◄──persist──► Zustand store (progress, known cards)
```

## Layers
- **Content (`content/`)** — source of truth, git-synced. JSON for structured items, markdown for daily logs.
- **Loaders (`lib/content.ts`)** — `server-only`; import JSON statically, read markdown via `fs`. Expose `getExpressions/getGrammar/getVocabulary/getMistakes/getLogList/getLog/getContentStats`.
- **Types (`lib/types.ts`)** — `Expression`, `GrammarPoint`, `VocabularyItem`, `Mistake`, `DailyLog(Meta)`.
- **State (`lib/store/progress.ts`)** — Zustand v5 + `persist`. `useHydrated()` guards SSR/CSR boundary. Selectors keep re-renders minimal.
- **Design system** — `app/globals.css` (tokens), `lib/utils.ts` (`cn`), `components/ui/*` (Button, Card, Badge, Input). Dark mode via next-themes (`.dark` class).
- **Routing (`app/`)** — one folder per feature; server components load data and pass it to client `*-view` components that handle search/interaction.

## Rendering model
- Pages are React Server Components (static). `/logs/[date]` uses `generateStaticParams` from `content/logs/index.json`.
- Interactive widgets (`"use client"`): nav, theme toggle, the four content views, `TodayCard`, `StreakCalendar`, `PracticeView`.

## Adding a feature page
1. Create `app/<feature>/page.tsx` (server) that loads from `lib/content.ts`.
2. If interactive, add a client `components/views/<feature>-view.tsx`.
3. Add a nav entry in `components/app-nav.tsx` (`NAV_ITEMS`).

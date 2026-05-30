# Architecture

## Overview
A static-friendly **multi-language** Next.js (App Router) site. Routes are namespaced by a `/[lang]` segment (`en` | `ja`; `/` → `/en`). Study content is read from files under `content/<lang>/` at build time, so the whole app prerenders to static HTML per language. Per-user state (streaks, known cards, plan steps) lives only in the browser via Zustand `persist`.

```
Browser ──renders──> Next.js pages (RSC, static, per /[lang])
                          │ read at build
                          ▼
            content/<lang>/*.json + content/<lang>/logs/*.md   ← git-synced (edit + push = update)

Browser localStorage ◄──persist──► Zustand store (streak, known cards, plan steps)
```

## Layers
- **Content (`content/<lang>/`)** — source of truth, git-synced. JSON for structured items + `plan.json`; markdown for daily logs.
- **Loaders (`lib/content.ts`)** — `server-only`; per-language static-import maps `{ en, ja }`, markdown via `fs`. Every loader takes `lang`. Exposes `getExpressions/getGrammar/getVocabulary/getMistakes/getPlan/getLogList/getLog/getContentStats`.
- **Types (`lib/types.ts`)** — `Lang`, `LANGS` (incl. `ttsLang`), `Expression` (`text`,`reading?`,`romaji?`), `GrammarPoint`, `VocabularyItem`, `Mistake`, `DailyLog(Meta)`, `StudyPlan`.
- **State (`lib/store/progress.ts`)** — Zustand v5 + `persist`. `useHydrated()` guards SSR/CSR. `studiedDates` (shared streak), `knownCards`, `completedPlanSteps` (ids namespaced `<lang>:<step>`).
- **Design system** — `app/globals.css` (tokens), `lib/utils.ts` (`cn`), `components/ui/*`. Dark mode via next-themes.
- **TTS** — `components/speak-button.tsx` (Web Speech API), lang from `LANGS[lang].ttsLang`.
- **Routing (`app/[lang]/`)** — `app/[lang]/layout.tsx` is the shell (reads `params.lang`, `generateStaticParams` = en/ja, `notFound()` for unknown). One folder per feature; server pages load data (cast `params` to `{ lang: Lang }`) and pass to client `*-view` components.

## Rendering model
- Pages are RSC (static/SSG). `/[lang]` and `/[lang]/logs/[date]` use `generateStaticParams` (the latter iterates langs × that lang's log dates).
- Interactive (`"use client"`): nav, lang switcher, theme toggle, content views, `TodayCard`, `StreakCalendar`, `PracticeView`, `PlanView`, `SpeakButton`.

## Adding a feature page
1. Create `app/[lang]/<feature>/page.tsx` (server); `await params`, cast to `{ lang: Lang }`, load via `lib/content.ts`.
2. If interactive, add a client `components/views/<feature>-view.tsx`.
3. Add a nav entry in `components/app-nav.tsx` (`NAV_ITEMS`, href is a suffix).

## Adding a language
Extend `Lang`/`LANGS` (`lib/types.ts`), add import maps in `lib/content.ts`, create `content/<code>/`, and add to `generateStaticParams` in `app/[lang]/layout.tsx`.

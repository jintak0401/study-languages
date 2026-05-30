<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Study Languages — agent & developer guide

A personal **multi-language** study website for **gambit@channel.io** (a Korean speaker). Built and maintained together with Claude, who also acts as the user's tutor. This file covers **English**; the **Japanese** tutoring guide is `JAPANESE.md`.

> **Read this first when you lose context.** It explains the purpose, how content flows, and the exact commands. See also `PROGRESS.md` (status + checklist) and `DEVLOG.md` (decisions & gotchas).

## What this is
- A Next.js site, organized by **language URL segment** `/[lang]` (`en` | `ja`; `/` redirects to `/en`). Each language has: **expressions, grammar, vocabulary, mistakes, a daily study log, a study plan**, plus **progress/streaks** and **practice** (flashcards + quiz). A **🔊 Speak** button (Web Speech API) reads text aloud (en-US / ja-JP).
- **Content is git-synced**: it lives as files under `content/<lang>/`. Editing a file + pushing updates the live site. No database, no login.
- Personal use, **public** repo: `jintak0401/study-languages` (default branch `main`).
- A single study **streak** is shared across languages (studying any language counts).

## The tutoring + content loop (important)
Claude tutors the user in chat AND keeps this site updated. After a study session:
1. Correct every mistake (❌ wrong → ✅ correct + short reason).
2. Add/append to the content files (see below).
3. For repeated mistakes, **increment `count`** and update `lastSeen` in `content/en/mistakes.json`. The Mistakes page flags `count >= 2` as a repeat ⚠️.
4. Commit + push so the site updates.

## How to add content (just edit JSON / markdown) — English under `content/en/`
- **Expressions** → `content/en/expressions.json` (`Expression[]`, field `text` + `paraphrases`).
- **Grammar** → `content/en/grammar.json` (`GrammarPoint[]`) — `wrong` vs `right` + examples.
- **Vocabulary** → `content/en/vocabulary.json` (`VocabularyItem[]`).
- **Mistakes** → `content/en/mistakes.json` (`Mistake[]`) — the running "all wrong points" tracker.
- **Daily log** → add `content/en/logs/YYYY-MM-DD.md` AND an entry in `content/en/logs/index.json`.
- **Study plan** → `content/en/plan.json` (`StudyPlan`).
- Types live in `lib/types.ts`; loaders in `lib/content.ts` (all take a `lang`).
- Raw tutor notes also kept in `english-study/` (scratch; the app reads `content/en/`).
- **Japanese** lives under `content/ja/` — see `JAPANESE.md` for that tutoring loop.

## Adding a new language
1. Add the code to `Lang`/`LANGS` in `lib/types.ts` and to the static imports + maps in `lib/content.ts`.
2. Create `content/<code>/` with the JSON/markdown files (copy the shape of `content/en/`).
3. Add it to `generateStaticParams` in `app/[lang]/layout.tsx` and the lang switcher picks it up automatically.

## Tech stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + a custom token-based design system (`app/globals.css`, `components/ui/*`, `cn` in `lib/utils.ts`)
- Zustand v5 for client state (`lib/store/progress.ts`) with `persist` (localStorage) + selector subscriptions for re-render optimization
- next-themes (dark mode), lucide-react (icons), react-markdown + remark-gfm (daily logs)

## Commands
Node **24 LTS** is the default (via fnm), so pnpm works normally:
```bash
pnpm dev      # dev server → http://localhost:3000
pnpm build    # production build
pnpm lint     # lint
```

## PWA
The app is an installable PWA: `app/manifest.ts` (webmanifest), icons in `public/` + `app/`, offline service worker at `public/sw.js`, registered by `components/pwa-register.tsx`. To bust the SW cache after a change, bump `CACHE` in `public/sw.js`.

## Deploy (Vercel)
The repo is public on GitHub (`jintak0401/study-languages`, branch `main`). Deploy by importing it at vercel.com/new (zero config — Next.js is auto-detected). After that, **every `git push` to `main` auto-deploys**, which matches the git-sync content model. See `PROGRESS.md` for current deploy status.

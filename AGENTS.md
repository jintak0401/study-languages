<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Study English — agent & developer guide

A personal website for **gambit@channel.io** (a Korean speaker) to study English. Built and maintained together with Claude, who also acts as the user's English tutor.

> **Read this first when you lose context.** It explains the purpose, how content flows, and the exact commands. See also `PROGRESS.md` (status + checklist) and `DEVLOG.md` (decisions & gotchas).

## What this is
- A Next.js site that shows the user's **expressions, grammar, vocabulary, mistakes, and a daily study log**, plus **progress/streaks** and **practice** (flashcards + quiz).
- **Content is git-synced**: it lives as files under `content/`. Editing a file and pushing to GitHub updates the live site. No database, no login.
- Personal use, **public** repo: `jintak0401/study-english`.

## The tutoring + content loop (important)
Claude tutors the user in chat AND keeps this site updated. After a study session:
1. Correct every mistake (❌ wrong → ✅ correct + short reason).
2. Add/append to the content files (see below).
3. For repeated mistakes, **increment `count`** and update `lastSeen` in `content/mistakes.json`. The Mistakes page flags `count >= 2` as a repeat ⚠️.
4. Commit + push so the site updates.

## How to add content (just edit JSON / markdown)
- **Expressions** → `content/expressions.json` (`Expression[]`) — includes `paraphrases` (the user loves paraphrasing).
- **Grammar** → `content/grammar.json` (`GrammarPoint[]`) — `wrong` vs `right` + examples.
- **Vocabulary** → `content/vocabulary.json` (`VocabularyItem[]`).
- **Mistakes** → `content/mistakes.json` (`Mistake[]`) — the running "all wrong points" tracker.
- **Daily log** → add `content/logs/YYYY-MM-DD.md` AND an entry in `content/logs/index.json`.
- Types live in `lib/types.ts`; loaders in `lib/content.ts`.
- Raw tutor notes also kept in `english-study/` (scratch; the app reads `content/`).

## Tech stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + a custom token-based design system (`app/globals.css`, `components/ui/*`, `cn` in `lib/utils.ts`)
- Zustand v5 for client state (`lib/store/progress.ts`) with `persist` (localStorage) + selector subscriptions for re-render optimization
- next-themes (dark mode), lucide-react (icons), react-markdown + remark-gfm (daily logs)

## Commands
> ⚠️ **Node version:** pnpm 10.29 requires Node ≥ 22.13, but the default is 22.12. Either `fnm use 22.15.0` first, or run the binaries directly:
```bash
node_modules/.bin/next dev      # dev server → http://localhost:3000
node_modules/.bin/next build    # production build
node_modules/.bin/next lint     # lint
```
With Node ≥ 22.13 you can use `pnpm dev` / `pnpm build` as normal.

## Deploy (Vercel)
The repo is public on GitHub. Deploy by importing it at vercel.com/new (zero config — Next.js is auto-detected). After that, **every `git push` auto-deploys**, which matches the git-sync content model. See `PROGRESS.md` for current deploy status.

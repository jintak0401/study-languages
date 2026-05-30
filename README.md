# Study English 📚

A personal website to study English anywhere — built to learn expressions, grammar, vocabulary, review past mistakes, keep a daily study log, track a streak, and practice with flashcards & quizzes.

**Content is git-synced**: everything under `content/` is just files. Edit them, push to GitHub, and the live site updates. No database, no login. Fully responsive (built mobile-first for studying on a phone).

## Tech
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Zustand v5 · next-themes · react-markdown

## Develop
```bash
node_modules/.bin/next dev     # → http://localhost:3000
```
> pnpm needs Node ≥ 22.13. With that, `pnpm dev` / `pnpm build` work normally. Otherwise run the local `next` binary directly (see `AGENTS.md`).

## Docs
- `AGENTS.md` — how the project works + how to add content
- `PROGRESS.md` — build status & next steps
- `DEVLOG.md` — decisions & gotchas
- `docs/ARCHITECTURE.md` — structure & rendering model

## Deploy
Import the repo at [vercel.com/new](https://vercel.com/new) (zero config). Every push then auto-deploys.

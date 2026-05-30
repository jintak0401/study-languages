# Progress

Build/status tracker so work can resume after a context loss. See `AGENTS.md` for how the project works and `DEVLOG.md` for decisions.

## Status: v1 built locally; not yet deployed

| Phase | Status | Notes |
|-------|--------|-------|
| 0. Repo + scaffold | ✅ done | Repo made **public**; Next.js 16 scaffolded at root with pnpm. |
| 1. Design system + shell | ✅ done | Token-based DS (`app/globals.css`, `components/ui/*`), responsive sidebar + mobile nav, dark mode. |
| 2. Content layer | ✅ done | `lib/types.ts`, `lib/content.ts`; seeded `content/` from tutor notes + examples. |
| 3. Zustand state | ✅ done | `lib/store/progress.ts` (persist + selectors + `useHydrated`). |
| 4. Feature pages | ✅ done | dashboard, expressions, grammar, vocabulary, mistakes, logs (+`[date]`), progress, practice. |
| 5. Polish | ✅ done | search, empty states, mobile verified in browser; `next build` clean, no console errors. |
| 6. Deploy to Vercel | ⏳ pending | Needs the user to import the GitHub repo on vercel.com (one-time). Then auto-deploys on push. |
| 7. Context docs | ✅ done | This file, `DEVLOG.md`, `AGENTS.md`, `docs/ARCHITECTURE.md`. |

## Verified working (local, in-browser)
- Dashboard streak card + "mark today studied" (persists to localStorage).
- Mobile (390px) layout: collapsing nav, stacked cards, scrollable tables.
- Practice: flashcard flip, shuffle, quiz scoring + correct/incorrect feedback.
- Mistakes: sorted by repeat count, "Repeats" filter, ⚠️ badges.
- Daily log markdown (GFM tables, headings, Korean text) renders.
- Dark mode toggle.

## Next steps / backlog
1. **Deploy**: import `jintak0401/study-english` at vercel.com/new (zero config).
2. Keep adding content after each tutoring session (see `AGENTS.md`).
3. Recommended later features (not built): spaced-repetition scheduling, dedicated paraphrasing trainer, audio/pronunciation.

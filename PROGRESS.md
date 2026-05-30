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
| 8. PWA | ✅ done | manifest + icons + offline SW + registration; verified installable & SW activated. |
| 9. Deployed | ✅ done | Live at https://study-languages-six.vercel.app (Vercel CLI; protection off; framework=nextjs). |
| 10. Multi-language (Japanese) | ✅ done | `/[lang]` routing (en/ja), `content/<lang>/`, Study Plan, TTS (Speak), `JAPANESE.md`, rebrand → "Study Languages". |

## Verified working (local, in-browser)
- Dashboard streak card + "mark today studied" (persists to localStorage).
- Mobile (390px) layout: collapsing nav, stacked cards, scrollable tables.
- Practice: flashcard flip, shuffle, quiz scoring + correct/incorrect feedback.
- Mistakes: sorted by repeat count, "Repeats" filter, ⚠️ badges.
- Daily log markdown (GFM tables, headings, Korean text) renders.
- Dark mode toggle.

## Next steps / backlog
1. Keep adding content after each tutoring session — English via `AGENTS.md`, Japanese via `JAPANESE.md`.
2. Redeploy after content changes: `npx vercel deploy --prod` (or set up GitHub auto-deploy — needs the Vercel GitHub App installed once).
3. Recommended later: spaced-repetition scheduling, dedicated paraphrasing trainer, more Japanese content, kana drill mini-game.

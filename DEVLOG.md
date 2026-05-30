# Dev log — decisions & trial-and-error

Chronological notes so a future session understands *why* things are the way they are.

## 2026-05-30 — initial build
- **Scaffold conflict.** `create-next-app .` aborts if the dir has non-whitelisted files. Fixed by temporarily moving `english-study/`, `.context`, `.gitkeep` to `/tmp`, scaffolding, then restoring. (`.gitkeep` dropped — no longer needed.)
- **Design system: custom, not shadcn CLI.** Chose a token-based DS (cva + tailwind-merge + CSS variables in `globals.css`) over running the shadcn CLI — avoids CLI/Tailwind-v4 friction and keeps full control. Same primitives shape (`Button`, `Card`, `Badge`, `Input`).
- **Tailwind v4 dark mode.** Used `@custom-variant dark (&:where(.dark, .dark *))` + next-themes `attribute="class"`. Tokens defined as CSS vars under `:root` / `.dark`, mapped via `@theme inline`.
- **SSR hydration bug (build failure).** `useHydrated` initially called `useProgressStore.persist.hasHydrated()` inside `useState` initializer → `/practice` prerender crashed (`Cannot read properties of undefined`). Fixed: start `false` on server + first client render, flip to `true` in `useEffect` via `onFinishHydration`. This also prevents hydration mismatches. Pattern reused by all store-reading components (`TodayCard`, `StreakCalendar`, `FlashcardDeck`).
- **Node/pnpm mismatch.** pnpm 10.29 requires Node ≥ 22.13; default is 22.12 → `pnpm build` refuses. Workaround: run `node_modules/.bin/next ...` directly (Next 16 runs fine on 22.12), or `fnm use 22.15.0`. Not changing the system default without asking.
- **Re-render optimization.** Components subscribe with narrow selectors (`useProgressStore(s => ...)`) returning primitives, so Zustand's `Object.is` comparison limits re-renders to the slices that changed.
- **Content model.** Structured items as JSON (filterable, typed); daily logs as markdown (GFM tables render via react-markdown + remark-gfm). All under `content/`, read by `lib/content.ts` (server-only).

## 2026-05-30 — deploy + multi-language (Japanese)
- **Deployed via Vercel CLI.** Device-code login. Fixed: (1) project `ssoProtection` → null (was walling the site); (2) pre-creating the project left `framework: null` so only `/public` served (app routes 404) → PATCH `framework: "nextjs"` + redeploy. Live: study-languages-six.vercel.app (note: `study-languages.vercel.app` is another owner's project).
- **Multi-language refactor.** Added `/[lang]` segment (`en`/`ja`); `/` redirects to `/en`. Moved all pages under `app/[lang]/`; shell moved to `app/[lang]/layout.tsx` (reads `params.lang`); root layout keeps only html/theme/PWA. Content moved to `content/<lang>/`; loaders take `lang`.
- **Page params typing gotcha.** Next 16's generated PageProps types `params` as `{ lang: string }`. Typing it as the narrowed `Lang` fails the build (contravariance). Fix: declare `Promise<{ lang: string }>` and cast `(await params) as { lang: Lang }` inside.
- **Renamed `Expression.en` → `text`** + added optional `reading`/`romaji` (Japanese) to Expression/Vocabulary — keeps types shared across languages.
- **TTS** via Web Speech API (`components/speak-button.tsx`), no dependency; voice matched to `LANGS[lang].ttsLang`. Hides if unsupported.
- **Study Plan** = `content/<lang>/plan.json`, rendered by `plan-view.tsx`; step completion stored in Zustand (`completedPlanSteps`, ids namespaced `ja:s1-1`). One shared streak across languages.
- Japanese tutoring guide for a separate session: `JAPANESE.md`.

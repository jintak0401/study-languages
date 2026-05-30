import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

import { todayKey } from "@/lib/date";

interface ProgressState {
  /** Local dates (YYYY-MM-DD) the user marked as studied (shared across languages). */
  studiedDates: string[];
  /** Flashcard ids the user marked as "known". */
  knownCards: string[];
  /** Completed study-plan step ids, namespaced by language (e.g. "ja:s1-1"). */
  completedPlanSteps: string[];
  toggleStudied: (date: string) => void;
  markStudiedToday: () => void;
  toggleCardKnown: (id: string) => void;
  resetKnownCards: () => void;
  togglePlanStep: (id: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      studiedDates: [],
      knownCards: [],
      completedPlanSteps: [],
      toggleStudied: (date) =>
        set((s) => ({
          studiedDates: s.studiedDates.includes(date)
            ? s.studiedDates.filter((d) => d !== date)
            : [...s.studiedDates, date],
        })),
      markStudiedToday: () =>
        set((s) => {
          const key = todayKey();
          return s.studiedDates.includes(key)
            ? s
            : { studiedDates: [...s.studiedDates, key] };
        }),
      toggleCardKnown: (id) =>
        set((s) => ({
          knownCards: s.knownCards.includes(id)
            ? s.knownCards.filter((c) => c !== id)
            : [...s.knownCards, id],
        })),
      resetKnownCards: () => set({ knownCards: [] }),
      togglePlanStep: (id) =>
        set((s) => ({
          completedPlanSteps: s.completedPlanSteps.includes(id)
            ? s.completedPlanSteps.filter((x) => x !== id)
            : [...s.completedPlanSteps, id],
        })),
    }),
    { name: "study-english-progress" },
  ),
);

/**
 * True once the persisted store has rehydrated from localStorage.
 * Starts false on both server and first client render (no hydration mismatch),
 * then flips to true after mount / rehydration.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const persist = useProgressStore.persist;
    if (persist.hasHydrated()) setHydrated(true);
    const unsub = persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);
  return hydrated;
}

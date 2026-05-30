"use client";

import { useMemo } from "react";

import { formatNice, lastNDays, todayKey } from "@/lib/date";
import { useHydrated, useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

const DAYS = 7 * 14; // ~14 weeks

export function StreakCalendar() {
  const hydrated = useHydrated();
  const studiedDates = useProgressStore((s) => s.studiedDates);
  const toggleStudied = useProgressStore((s) => s.toggleStudied);

  const studied = useMemo(() => new Set(studiedDates), [studiedDates]);
  const days = useMemo(() => lastNDays(DAYS), []);
  const today = todayKey();

  return (
    <div className="space-y-3">
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {days.map((d) => {
          const isStudied = hydrated && studied.has(d);
          return (
            <button
              key={d}
              type="button"
              onClick={() => toggleStudied(d)}
              disabled={!hydrated}
              title={`${formatNice(d)}${isStudied ? " · studied" : ""}`}
              aria-label={`${formatNice(d)}${isStudied ? " studied" : " not studied"}`}
              className={cn(
                "size-4 rounded-[3px] border transition-colors",
                isStudied
                  ? "border-primary bg-primary"
                  : "border-border bg-muted hover:bg-accent",
                d === today && "ring-2 ring-ring ring-offset-1 ring-offset-background",
              )}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <span className="size-3 rounded-[3px] bg-muted" />
        <span className="size-3 rounded-[3px] bg-primary" />
        <span>More · tap a day to toggle</span>
      </div>
    </div>
  );
}

"use client";

import { Check, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { computeStreak, todayKey } from "@/lib/date";
import { useHydrated, useProgressStore } from "@/lib/store/progress";

export function TodayCard() {
  const hydrated = useHydrated();
  // Selector-based subscriptions: each value re-renders only when it changes.
  const streak = useProgressStore((s) => computeStreak(s.studiedDates));
  const studiedToday = useProgressStore((s) =>
    s.studiedDates.includes(todayKey()),
  );
  const toggleStudied = useProgressStore((s) => s.toggleStudied);

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Flame className="size-6" />
          </span>
          <div>
            <p className="text-2xl font-bold leading-none">
              {hydrated ? streak : "–"}{" "}
              <span className="text-base font-normal text-muted-foreground">
                day streak
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Goal: study 30 minutes today
            </p>
          </div>
        </div>
        <Button
          variant={studiedToday ? "secondary" : "default"}
          onClick={() => toggleStudied(todayKey())}
          disabled={!hydrated}
        >
          {studiedToday ? (
            <>
              <Check /> Studied today
            </>
          ) : (
            "Mark today as studied"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

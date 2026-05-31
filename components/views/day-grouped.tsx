"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { NoResults, SearchBar } from "@/components/search-bar";
import { cn } from "@/lib/utils";
import { formatNice, todayKey } from "@/lib/date";

const UNDATED = "0000-00-00";

/**
 * Generic "study day by day" layout: a search box, a row of day chips (quick
 * jump / filter), and the items grouped into day sections (newest day first).
 * Item rendering is delegated to `renderItem` so each content type keeps its
 * own card.
 */
export function DayGrouped<T extends { id: string }>({
  items,
  getDate,
  getSearchText,
  renderItem,
  placeholder,
  gridClassName = "grid gap-4",
}: {
  items: T[];
  getDate: (item: T) => string | undefined;
  getSearchText: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  placeholder: string;
  gridClassName?: string;
}) {
  const [q, setQ] = useState("");
  const [day, setDay] = useState<string | null>(null); // null = all days

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) => getSearchText(it).toLowerCase().includes(term));
  }, [items, q, getSearchText]);

  const groups = useMemo(() => {
    const map = new Map<string, T[]>();
    for (const it of filtered) {
      const d = getDate(it) ?? UNDATED;
      const arr = map.get(d);
      if (arr) arr.push(it);
      else map.set(d, [it]);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered, getDate]);

  const allDays = useMemo(() => {
    const s = new Set<string>();
    for (const it of items) s.add(getDate(it) ?? UNDATED);
    return [...s].sort((a, b) => b.localeCompare(a));
  }, [items, getDate]);

  const today = todayKey();
  const label = (d: string) => (d === UNDATED ? "이전" : formatNice(d));
  const shown = day ? groups.filter(([d]) => d === day) : groups;

  const chip = (active: boolean) =>
    cn(
      "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    );

  return (
    <div className="min-w-0 space-y-4">
      <SearchBar value={q} onChange={setQ} placeholder={placeholder} />

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button type="button" onClick={() => setDay(null)} className={chip(day === null)}>
          전체
        </button>
        {allDays.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDay(d)}
            className={chip(day === d)}
          >
            {label(d)}
            {d === today ? " · 오늘" : ""}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <NoResults>No results match “{q}”.</NoResults>
      ) : (
        <div className="space-y-6">
          {shown.map(([d, list]) => (
            <section key={d} className="min-w-0 space-y-3">
              <div className="flex items-center gap-2 border-b border-border pb-1">
                <h2 className="text-sm font-semibold">
                  {label(d)}
                  {d === today ? " · 오늘" : ""}
                </h2>
                <Badge variant="secondary">{list.length}</Badge>
              </div>
              <div className={gridClassName}>{list.map(renderItem)}</div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

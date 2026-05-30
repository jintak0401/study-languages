"use client";

import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

import type { Mistake } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NoResults, SearchBar } from "@/components/search-bar";
import { cn } from "@/lib/utils";

export function MistakesView({ items }: { items: Mistake[] }) {
  const [q, setQ] = useState("");
  const [onlyRepeats, setOnlyRepeats] = useState(false);

  const repeatCount = items.filter((m) => m.count >= 2).length;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((m) => {
      if (onlyRepeats && m.count < 2) return false;
      if (!term) return true;
      return [m.type, m.wrong, m.right, m.reason]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [items, q, onlyRepeats]);

  return (
    <div className="space-y-4">
      <SearchBar value={q} onChange={setQ} placeholder="Search your mistakes…" />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => setOnlyRepeats(false)}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            !onlyRepeats
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent",
          )}
        >
          All ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setOnlyRepeats(true)}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            onlyRepeats
              ? "bg-destructive text-destructive-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent",
          )}
        >
          Repeats ({repeatCount})
        </button>
      </div>

      {filtered.length === 0 ? (
        <NoResults>No mistakes match your filter.</NoResults>
      ) : (
        <div className="grid gap-4">
          {filtered.map((m) => (
            <Card key={m.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{m.type}</span>
                  <Badge variant={m.count >= 2 ? "destructive" : "secondary"}>
                    {m.count >= 2 ? `⚠️ ${m.count}× repeated` : "1×"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-start gap-2 text-sm">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                  <span className="text-muted-foreground line-through">
                    {m.wrong}
                  </span>
                </p>
                <p className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="font-medium">{m.right}</span>
                </p>
                <p className="text-sm text-muted-foreground">{m.reason}</p>
                <p className="text-xs text-muted-foreground">
                  First seen {m.firstSeen} · Last seen {m.lastSeen}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Repeat } from "lucide-react";

import type { Expression } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoResults, SearchBar } from "@/components/search-bar";

export function ExpressionsView({ items }: { items: Expression[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) =>
      [it.en, it.ko, ...it.paraphrases, ...it.tags]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [items, q]);

  return (
    <div className="space-y-4">
      <SearchBar value={q} onChange={setQ} placeholder="Search expressions…" />
      {filtered.length === 0 ? (
        <NoResults>No expressions match “{q}”.</NoResults>
      ) : (
        <div className="grid gap-4">
          {filtered.map((it) => (
            <Card key={it.id}>
              <CardHeader>
                <CardTitle className="text-base">{it.en}</CardTitle>
                <p className="text-sm text-muted-foreground">{it.ko}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Repeat className="size-4" /> Other ways to say it
                </div>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {it.paraphrases.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {it.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {it.tags.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

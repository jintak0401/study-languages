"use client";

import { useMemo, useState } from "react";

import type { VocabularyItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoResults, SearchBar } from "@/components/search-bar";

export function VocabularyView({ items }: { items: VocabularyItem[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) =>
      [it.word, it.meaning, it.partOfSpeech, ...it.tags]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [items, q]);

  return (
    <div className="space-y-4">
      <SearchBar value={q} onChange={setQ} placeholder="Search words…" />
      {filtered.length === 0 ? (
        <NoResults>No words match “{q}”.</NoResults>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((it) => (
            <Card key={it.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{it.word}</CardTitle>
                  <Badge variant="outline">{it.partOfSpeech}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{it.meaning}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {it.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

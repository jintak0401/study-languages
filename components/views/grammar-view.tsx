"use client";

import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

import type { GrammarPoint } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoResults, SearchBar } from "@/components/search-bar";
import { SpeakButton } from "@/components/speak-button";

export function GrammarView({
  items,
  ttsLang,
}: {
  items: GrammarPoint[];
  ttsLang: string;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) =>
      [it.title, it.rule, it.wrong, it.right, ...it.tags]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [items, q]);

  return (
    <div className="space-y-4">
      <SearchBar value={q} onChange={setQ} placeholder="Search grammar…" />
      {filtered.length === 0 ? (
        <NoResults>No grammar points match “{q}”.</NoResults>
      ) : (
        <div className="grid gap-4">
          {filtered.map((it) => (
            <Card key={it.id}>
              <CardHeader>
                <CardTitle className="text-base">{it.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{it.rule}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <p className="flex items-center gap-2 text-sm">
                    <X className="size-4 shrink-0 text-destructive" />
                    <span className="text-muted-foreground line-through">
                      {it.wrong}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-success" />
                    <span className="font-medium">{it.right}</span>
                    <SpeakButton text={it.right} lang={ttsLang} />
                  </p>
                </div>
                {it.examples.length > 0 && (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {it.examples.map((ex) => (
                      <li key={ex}>{ex}</li>
                    ))}
                  </ul>
                )}
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

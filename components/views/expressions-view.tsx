"use client";

import { useMemo, useState } from "react";
import { Repeat } from "lucide-react";

import type { Expression } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoResults, SearchBar } from "@/components/search-bar";
import { SpeakButton } from "@/components/speak-button";

export function ExpressionsView({
  items,
  ttsLang,
}: {
  items: Expression[];
  ttsLang: string;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) =>
      [it.text, it.ko, it.reading, it.romaji, ...it.paraphrases, ...it.tags]
        .filter(Boolean)
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
                <div className="flex items-start gap-2">
                  <CardTitle className="text-base leading-relaxed">
                    {it.text}
                  </CardTitle>
                  <SpeakButton text={it.text} lang={ttsLang} className="mt-0.5" />
                </div>
                {(it.reading || it.romaji) && (
                  <p className="text-sm text-muted-foreground">
                    {it.reading}
                    {it.reading && it.romaji ? " · " : ""}
                    {it.romaji ? <span className="italic">{it.romaji}</span> : null}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">{it.ko}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Repeat className="size-4" /> Other ways to say it
                </div>
                <ul className="space-y-1 text-sm">
                  {it.paraphrases.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <SpeakButton text={p} lang={ttsLang} />
                      <span>{p}</span>
                    </li>
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

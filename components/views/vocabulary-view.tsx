"use client";

import { useMemo, useState } from "react";

import type { VocabularyItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoResults, SearchBar } from "@/components/search-bar";
import { SpeakButton } from "@/components/speak-button";

/** Text to read aloud: drop any parenthetical gloss (e.g. Korean meaning) so
 *  the voice reads only the target-language sentence. English examples (no
 *  parentheses) are unchanged. */
function speakable(example: string): string {
  return example.replace(/[（(][^）)]*[）)]/g, "").trim() || example;
}

export function VocabularyView({
  items,
  ttsLang,
}: {
  items: VocabularyItem[];
  ttsLang: string;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((it) =>
      [it.word, it.meaning, it.reading, it.romaji, it.partOfSpeech, ...it.tags]
        .filter(Boolean)
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
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{it.word}</CardTitle>
                    <SpeakButton text={it.reading ?? it.word} lang={ttsLang} />
                  </div>
                  <Badge variant="outline">{it.partOfSpeech}</Badge>
                </div>
                {(it.reading || it.romaji) && (
                  <p className="text-sm text-muted-foreground">
                    {it.reading}
                    {it.reading && it.romaji ? " · " : ""}
                    {it.romaji ? <span className="italic">{it.romaji}</span> : null}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">{it.meaning}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-1.5 text-sm">
                  {it.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-1.5">
                      <SpeakButton
                        text={speakable(ex)}
                        lang={ttsLang}
                        className="-ml-1 mt-px size-6 shrink-0"
                      />
                      <span>{ex}</span>
                    </li>
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

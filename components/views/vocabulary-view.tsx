"use client";

import type { VocabularyItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeakButton } from "@/components/speak-button";
import { DayGrouped } from "@/components/views/day-grouped";

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
  return (
    <DayGrouped
      items={items}
      placeholder="Search words…"
      gridClassName="grid gap-4 sm:grid-cols-2"
      getDate={(it) => it.date}
      getSearchText={(it) =>
        [it.word, it.meaning, it.reading, it.romaji, it.partOfSpeech, ...it.tags]
          .filter(Boolean)
          .join(" ")
      }
      renderItem={(it) => (
        <Card key={it.id} className="min-w-0">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
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
      )}
    />
  );
}

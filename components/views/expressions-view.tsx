"use client";

import { Repeat } from "lucide-react";

import type { Expression } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeakButton } from "@/components/speak-button";
import { DayGrouped } from "@/components/views/day-grouped";
import { SectionPractice } from "@/components/views/practice-view";
import { expressionCards } from "@/lib/quiz";

export function ExpressionsView({
  items,
  ttsLang,
}: {
  items: Expression[];
  ttsLang: string;
}) {
  return (
    <SectionPractice
      cards={expressionCards(items)}
      ttsLang={ttsLang}
      list={
        <DayGrouped
          items={items}
          placeholder="Search expressions…"
          getDate={(it) => it.date}
          getSearchText={(it) =>
            [it.text, it.ko, it.reading, it.romaji, ...it.paraphrases, ...it.tags]
              .filter(Boolean)
              .join(" ")
          }
          renderItem={(it) => (
            <Card key={it.id} className="min-w-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base leading-relaxed">{it.text}</CardTitle>
                  <SpeakButton text={it.text} lang={ttsLang} />
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
                    <li key={p} className="flex items-center gap-2">
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
          )}
        />
      }
    />
  );
}

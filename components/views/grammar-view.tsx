"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import type { GrammarPoint } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeakButton } from "@/components/speak-button";
import { MarkdownView } from "@/components/markdown";
import { DayGrouped } from "@/components/views/day-grouped";
import { SectionPractice } from "@/components/views/practice-view";
import { grammarCards } from "@/lib/quiz";
import { cn } from "@/lib/utils";

export function GrammarView({
  items,
  ttsLang,
}: {
  items: GrammarPoint[];
  ttsLang: string;
}) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <SectionPractice
      cards={grammarCards(items)}
      ttsLang={ttsLang}
      list={
        <DayGrouped
          items={items}
          placeholder="Search grammar…"
          getDate={(it) => it.date}
          getSearchText={(it) =>
            [it.title, it.rule, it.wrong, it.right, it.detail ?? "", ...it.tags].join(" ")
          }
          renderItem={(it) => {
            const hasDetail = Boolean(it.detail);
            const isOpen = hasDetail && open.has(it.id);
            return (
              <Card key={it.id} className="min-w-0 overflow-hidden">
                <CardHeader>
                  {hasDetail ? (
                    <button
                      type="button"
                      onClick={() => toggle(it.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-3 text-left"
                    >
                      <span className="min-w-0">
                        <CardTitle className="text-base">{it.title}</CardTitle>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {it.rule}
                        </span>
                      </span>
                      <span className="mt-0.5 flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        {isOpen ? "접기" : "자세히"}
                        <ChevronDown
                          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
                        />
                      </span>
                    </button>
                  ) : (
                    <>
                      <CardTitle className="text-base">{it.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{it.rule}</p>
                    </>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-2">
                    <p className="flex items-center gap-2 text-sm">
                      <X className="size-4 shrink-0 text-destructive" />
                      <span className="text-muted-foreground line-through">{it.wrong}</span>
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
                  {isOpen && it.detail && (
                    <div className="min-w-0 overflow-x-auto rounded-lg border border-border bg-muted/30 p-4">
                      <MarkdownView>{it.detail}</MarkdownView>
                    </div>
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
            );
          }}
        />
      }
    />
  );
}

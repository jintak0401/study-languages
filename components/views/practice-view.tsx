"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, Shuffle, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useHydrated, useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

export interface PracticeCard {
  id: string;
  front: string;
  back: string;
  kind: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PracticeView({ cards }: { cards: PracticeCard[] }) {
  const [mode, setMode] = useState<"flashcards" | "quiz">("flashcards");

  if (cards.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
        Add some vocabulary or expressions to start practicing.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["flashcards", "quiz"] as const).map((m) => (
          <Button
            key={m}
            variant={mode === m ? "default" : "secondary"}
            size="sm"
            onClick={() => setMode(m)}
            className="capitalize"
          >
            {m}
          </Button>
        ))}
      </div>
      {mode === "flashcards" ? (
        <FlashcardDeck cards={cards} />
      ) : (
        <Quiz cards={cards} />
      )}
    </div>
  );
}

function FlashcardDeck({ cards }: { cards: PracticeCard[] }) {
  const hydrated = useHydrated();
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const knownCards = useProgressStore((s) => s.knownCards);
  const toggleCardKnown = useProgressStore((s) => s.toggleCardKnown);

  const card = cards[order[pos]];
  const isKnown = hydrated && knownCards.includes(card.id);

  function go(delta: number) {
    setFlipped(false);
    setPos((p) => (p + delta + cards.length) % cards.length);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {pos + 1} / {cards.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setOrder(shuffle(cards.map((_, i) => i)));
            setPos(0);
            setFlipped(false);
          }}
        >
          <Shuffle /> Shuffle
        </Button>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-colors hover:border-primary/50"
      >
        <Badge variant="outline">{card.kind}</Badge>
        <span className="text-xl font-semibold">
          {flipped ? card.back : card.front}
        </span>
        <span className="text-xs text-muted-foreground">
          {flipped ? "Tap to hide" : "Tap to reveal"}
        </span>
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => go(-1)}>
            Previous
          </Button>
          <Button variant="secondary" onClick={() => go(1)}>
            Next
          </Button>
        </div>
        <Button
          variant={isKnown ? "secondary" : "outline"}
          onClick={() => toggleCardKnown(card.id)}
          disabled={!hydrated}
        >
          <Check /> {isKnown ? "Known" : "Mark as known"}
        </Button>
      </div>
    </div>
  );
}

interface Question {
  card: PracticeCard;
  options: string[];
}

function Quiz({ cards }: { cards: PracticeCard[] }) {
  const [seed, setSeed] = useState(0);
  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const questions = useMemo<Question[]>(() => {
    void seed; // re-shuffle when seed changes
    const backs = cards.map((c) => c.back);
    return shuffle(cards).map((card) => {
      const distractors = shuffle(backs.filter((b) => b !== card.back)).slice(
        0,
        3,
      );
      return { card, options: shuffle([card.back, ...distractors]) };
    });
  }, [cards, seed]);

  const q = questions[pos];
  const answered = selected !== null;
  const isLast = pos === questions.length - 1;

  function choose(option: string) {
    if (answered) return;
    setSelected(option);
    if (option === q.card.back) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      // restart
      setSeed((s) => s + 1);
      setPos(0);
      setScore(0);
    } else {
      setPos((p) => p + 1);
    }
    setSelected(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {pos + 1} / {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>

      <Card>
        <CardContent className="space-y-1 p-5">
          <Badge variant="outline">{q.card.kind}</Badge>
          <p className="pt-2 text-lg font-semibold">{q.card.front}</p>
          <p className="text-sm text-muted-foreground">
            Which one matches?
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-2">
        {q.options.map((opt) => {
          const correct = opt === q.card.back;
          const chosen = opt === selected;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(opt)}
              disabled={answered}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg border border-border px-4 py-3 text-left text-sm transition-colors",
                !answered && "hover:border-primary/50 hover:bg-accent",
                answered && correct && "border-success bg-success/10",
                answered &&
                  chosen &&
                  !correct &&
                  "border-destructive bg-destructive/10",
              )}
            >
              <span>{opt}</span>
              {answered && correct && (
                <Check className="size-4 text-success" />
              )}
              {answered && chosen && !correct && (
                <X className="size-4 text-destructive" />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <Button onClick={next} className="w-full">
          {isLast ? (
            <>
              <RotateCcw /> Restart quiz
            </>
          ) : (
            "Next question"
          )}
        </Button>
      )}
    </div>
  );
}

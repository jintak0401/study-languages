import type { Expression, GrammarPoint, VocabularyItem } from "./types";

export interface PracticeCard {
  id: string;
  /** Flashcard front / quiz prompt. */
  front: string;
  /** Flashcard back / quiz answer. */
  back: string;
  /** Target-language text to read aloud. */
  speak: string;
  kind: string;
  /** Quiz: what the learner should pick. */
  instruction?: string;
  /** Quiz: optional hint, revealed on demand. */
  hint?: string;
  /** Quiz: preferred wrong options (same language/category as `back`), best first. */
  distractors?: string[];
}

/** Vocabulary → quiz cards. Distractors are meanings of the SAME part of
 *  speech, so options are genuinely confusable (all verbs, all nouns, …). */
export function vocabCards(items: VocabularyItem[]): PracticeCard[] {
  const byPos = new Map<string, string[]>();
  for (const v of items) {
    const arr = byPos.get(v.partOfSpeech);
    if (arr) arr.push(v.meaning);
    else byPos.set(v.partOfSpeech, [v.meaning]);
  }
  const allMeanings = items.map((v) => v.meaning);
  return items.map((v) => ({
    id: `vocab-${v.id}`,
    front: v.reading && v.reading !== v.word ? `${v.word}（${v.reading}）` : v.word,
    back: v.meaning,
    speak: v.reading ?? v.word,
    kind: "단어",
    instruction: "뜻을 고르세요",
    hint: v.romaji,
    distractors: [
      ...(byPos.get(v.partOfSpeech) ?? []).filter((m) => m !== v.meaning),
      ...allMeanings.filter((m) => m !== v.meaning),
    ],
  }));
}

/** Expressions → quiz cards. Prompt is the Korean meaning; options are the
 *  correct sentence + authored minimal-pair variants (same sentence, one error). */
export function expressionCards(items: Expression[]): PracticeCard[] {
  const allTexts = items.map((e) => e.text);
  return items.map((e) => ({
    id: `expr-${e.id}`,
    front: e.ko,
    back: e.text,
    speak: e.text,
    kind: "표현",
    instruction: "알맞은 문장을 고르세요",
    hint: e.romaji ?? e.paraphrases[0],
    distractors:
      e.distractors && e.distractors.length
        ? e.distractors
        : allTexts.filter((t) => t !== e.text),
  }));
}

/** Grammar → quiz cards. Prompt is the rule; options are the corrected sentence
 *  plus other "wrong" sentences (so every option looks like a real attempt). */
export function grammarCards(items: GrammarPoint[]): PracticeCard[] {
  const sentenceLike = items.filter((g) => g.right.length <= 40);
  return sentenceLike.map((g) => ({
    id: `grammar-${g.id}`,
    front: g.rule,
    back: g.right,
    speak: g.right,
    kind: "문법",
    instruction: "규칙에 맞는 문장을 고르세요",
    hint: g.rule,
    distractors: [g.wrong, ...sentenceLike.filter((o) => o.id !== g.id).map((o) => o.wrong)],
  }));
}

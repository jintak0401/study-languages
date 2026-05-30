import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

import enExpressions from "@/content/en/expressions.json";
import enGrammar from "@/content/en/grammar.json";
import enVocabulary from "@/content/en/vocabulary.json";
import enMistakes from "@/content/en/mistakes.json";
import enPlan from "@/content/en/plan.json";
import enLogsIndex from "@/content/en/logs/index.json";

import jaExpressions from "@/content/ja/expressions.json";
import jaGrammar from "@/content/ja/grammar.json";
import jaVocabulary from "@/content/ja/vocabulary.json";
import jaMistakes from "@/content/ja/mistakes.json";
import jaPlan from "@/content/ja/plan.json";
import jaLogsIndex from "@/content/ja/logs/index.json";

import type {
  DailyLog,
  DailyLogMeta,
  Expression,
  GrammarPoint,
  Lang,
  Mistake,
  StudyPlan,
  VocabularyItem,
} from "./types";

const expressions = { en: enExpressions, ja: jaExpressions } as Record<
  Lang,
  Expression[]
>;
const grammar = { en: enGrammar, ja: jaGrammar } as Record<Lang, GrammarPoint[]>;
const vocabulary = { en: enVocabulary, ja: jaVocabulary } as Record<
  Lang,
  VocabularyItem[]
>;
const mistakes = { en: enMistakes, ja: jaMistakes } as Record<Lang, Mistake[]>;
const plans = { en: enPlan, ja: jaPlan } as Record<Lang, StudyPlan>;
const logsIndex = { en: enLogsIndex, ja: jaLogsIndex } as Record<
  Lang,
  DailyLogMeta[]
>;

export function getExpressions(lang: Lang): Expression[] {
  return expressions[lang];
}

export function getGrammar(lang: Lang): GrammarPoint[] {
  return grammar[lang];
}

export function getVocabulary(lang: Lang): VocabularyItem[] {
  return vocabulary[lang];
}

/** Mistakes, most-repeated first. */
export function getMistakes(lang: Lang): Mistake[] {
  return [...mistakes[lang]].sort((a, b) => b.count - a.count);
}

export function getPlan(lang: Lang): StudyPlan {
  return plans[lang];
}

/** Daily log metadata, newest first. */
export function getLogList(lang: Lang): DailyLogMeta[] {
  return [...logsIndex[lang]].sort((a, b) => b.date.localeCompare(a.date));
}

/** Read one day's markdown body. Returns null if the file is missing. */
export async function getLog(lang: Lang, date: string): Promise<DailyLog | null> {
  const meta = logsIndex[lang].find((l) => l.date === date);
  if (!meta) return null;
  try {
    const body = await fs.readFile(
      path.join(process.cwd(), "content", lang, "logs", `${date}.md`),
      "utf8",
    );
    return { ...meta, body };
  } catch {
    return null;
  }
}

/** Quick counts for the dashboard. */
export function getContentStats(lang: Lang) {
  return {
    expressions: expressions[lang].length,
    grammar: grammar[lang].length,
    vocabulary: vocabulary[lang].length,
    mistakes: mistakes[lang].length,
    logs: logsIndex[lang].length,
    planStages: plans[lang].stages.length,
  };
}

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

import expressionsData from "@/content/expressions.json";
import grammarData from "@/content/grammar.json";
import vocabularyData from "@/content/vocabulary.json";
import mistakesData from "@/content/mistakes.json";
import logsIndex from "@/content/logs/index.json";

import type {
  DailyLog,
  DailyLogMeta,
  Expression,
  GrammarPoint,
  Mistake,
  VocabularyItem,
} from "./types";

const LOGS_DIR = path.join(process.cwd(), "content", "logs");

export function getExpressions(): Expression[] {
  return expressionsData as Expression[];
}

export function getGrammar(): GrammarPoint[] {
  return grammarData as GrammarPoint[];
}

export function getVocabulary(): VocabularyItem[] {
  return vocabularyData as VocabularyItem[];
}

/** Mistakes, most-repeated first. */
export function getMistakes(): Mistake[] {
  return [...(mistakesData as Mistake[])].sort((a, b) => b.count - a.count);
}

/** Daily log metadata, newest first. */
export function getLogList(): DailyLogMeta[] {
  return [...(logsIndex as DailyLogMeta[])].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

/** Read one day's markdown body. Returns null if the file is missing. */
export async function getLog(date: string): Promise<DailyLog | null> {
  const meta = (logsIndex as DailyLogMeta[]).find((l) => l.date === date);
  if (!meta) return null;
  try {
    const body = await fs.readFile(path.join(LOGS_DIR, `${date}.md`), "utf8");
    return { ...meta, body };
  } catch {
    return null;
  }
}

/** Quick counts for the dashboard. */
export function getContentStats() {
  return {
    expressions: getExpressions().length,
    grammar: getGrammar().length,
    vocabulary: getVocabulary().length,
    mistakes: (mistakesData as Mistake[]).length,
    logs: (logsIndex as DailyLogMeta[]).length,
  };
}

/** Shared content types. Content lives as files under `content/<lang>/` (git-synced). */

export type Lang = "en" | "ja";

export interface LangMeta {
  /** Short label for toggles. */
  label: string;
  /** BCP-47 tag used for the Web Speech API. */
  ttsLang: string;
}

export const LANGS: Record<Lang, LangMeta> = {
  en: { label: "EN", ttsLang: "en-US" },
  ja: { label: "日本語", ttsLang: "ja-JP" },
};

export function isLang(value: string): value is Lang {
  return value === "en" || value === "ja";
}

export interface Expression {
  id: string;
  /** The phrase in the target language. */
  text: string;
  /** Kana / pronunciation guide (Japanese). */
  reading?: string;
  /** Romanization (Japanese). */
  romaji?: string;
  /** Meaning in the learner's language (Korean). */
  ko: string;
  examples: string[];
  /** Different ways to say the same thing. */
  paraphrases: string[];
  tags: string[];
  /** Day it was introduced (YYYY-MM-DD) — used to group content by day. */
  date?: string;
  /** Quiz: wrong but confusable variants of `text` (minimal pairs) — same
   *  sentence with a particle/ending/word error. Used as quiz distractors. */
  distractors?: string[];
}

export interface GrammarPoint {
  id: string;
  title: string;
  rule: string;
  wrong: string;
  right: string;
  examples: string[];
  tags: string[];
  /** Optional in-depth explanation (Markdown, supports GFM tables). Shown when the card is expanded. */
  detail?: string;
  /** Day it was introduced (YYYY-MM-DD) — used to group content by day. */
  date?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  /** Kana reading (Japanese). */
  reading?: string;
  /** Romanization (Japanese). */
  romaji?: string;
  partOfSpeech: string;
  meaning: string;
  examples: string[];
  tags: string[];
  /** Day it was introduced (YYYY-MM-DD) — used to group content by day. */
  date?: string;
}

export interface Mistake {
  id: string;
  type: string;
  wrong: string;
  right: string;
  reason: string;
  count: number;
  firstSeen: string;
  lastSeen: string;
}

export interface DailyLogMeta {
  date: string;
  title: string;
  summary: string;
}

export interface DailyLog extends DailyLogMeta {
  body: string;
}

export interface PlanStep {
  id: string;
  title: string;
  detail: string;
}

export interface PlanStage {
  id: string;
  title: string;
  goal: string;
  steps: PlanStep[];
}

export interface StudyPlan {
  title: string;
  intro: string;
  stages: PlanStage[];
}

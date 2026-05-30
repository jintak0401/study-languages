/** Shared content types. All content lives as files under `content/` (git-synced). */

export interface Expression {
  id: string;
  en: string;
  ko: string;
  examples: string[];
  /** Different ways to say the same thing. */
  paraphrases: string[];
  tags: string[];
}

export interface GrammarPoint {
  id: string;
  title: string;
  /** The rule, in one short line. */
  rule: string;
  wrong: string;
  right: string;
  examples: string[];
  tags: string[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  examples: string[];
  tags: string[];
}

export interface Mistake {
  id: string;
  /** Short label for the kind of mistake. */
  type: string;
  wrong: string;
  right: string;
  reason: string;
  /** How many times this mistake has been made. */
  count: number;
  firstSeen: string; // YYYY-MM-DD
  lastSeen: string; // YYYY-MM-DD
}

export interface DailyLogMeta {
  /** YYYY-MM-DD; also the markdown filename stem under content/logs. */
  date: string;
  title: string;
  summary: string;
}

export interface DailyLog extends DailyLogMeta {
  /** Raw markdown body. */
  body: string;
}

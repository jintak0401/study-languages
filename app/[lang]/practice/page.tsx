import { PageHeader } from "@/components/page-header";
import {
  PracticeView,
  type PracticeCard,
} from "@/components/views/practice-view";
import {
  getExpressions,
  getGrammar,
  getMistakes,
  getVocabulary,
} from "@/lib/content";
import { LANGS, type Lang } from "@/lib/types";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };

  const vocab = getVocabulary(lang);
  const expressions = getExpressions(lang);
  const grammar = getGrammar(lang);
  const mistakes = getMistakes(lang);

  // Meanings grouped by part of speech → confusable (same-kind) distractors.
  const meaningsByPos = new Map<string, string[]>();
  for (const v of vocab) {
    const arr = meaningsByPos.get(v.partOfSpeech);
    if (arr) arr.push(v.meaning);
    else meaningsByPos.set(v.partOfSpeech, [v.meaning]);
  }
  const allRights = mistakes.map((m) => m.right);

  const cards: PracticeCard[] = [
    // Vocabulary — show the word, pick its meaning. Distractors = same part of speech.
    ...vocab.map((v) => ({
      id: `vocab-${v.id}`,
      front: v.reading && v.reading !== v.word ? `${v.word}（${v.reading}）` : v.word,
      back: v.meaning,
      speak: v.reading ?? v.word,
      kind: "단어",
      instruction: "뜻을 고르세요",
      hint: v.romaji,
      distractors: (meaningsByPos.get(v.partOfSpeech) ?? []).filter(
        (m) => m !== v.meaning,
      ),
    })),
    // Expressions — show the meaning, pick the correct target-language sentence.
    ...expressions.map((e) => ({
      id: `expr-${e.id}`,
      front: e.ko,
      back: e.text,
      speak: e.text,
      kind: "표현",
      instruction: "알맞은 문장을 고르세요",
      hint: e.romaji ?? e.paraphrases[0],
      distractors: expressions.map((x) => x.text).filter((t) => t !== e.text),
    })),
    // Mistakes — minimal-pair "which is correct?" (like the example quiz).
    ...mistakes.map((m) => ({
      id: `mistake-${m.id}`,
      front: "다음 중 올바른 표현은?",
      back: m.right,
      speak: m.right,
      kind: "함정",
      instruction: m.type,
      hint: m.reason,
      // The matching wrong form is the strongest distractor (a true minimal pair).
      distractors: [m.wrong, ...allRights.filter((r) => r !== m.right)],
    })),
    // Grammar — show the rule, pick the corrected sentence (wrong form is the trap).
    ...grammar
      .filter((g) => g.right.length <= 40) // only clean sentence-style pairs
      .map((g) => ({
        id: `grammar-${g.id}`,
        front: g.rule,
        back: g.right,
        speak: g.right,
        kind: "문법",
        instruction: "규칙에 맞는 문장을 고르세요",
        hint: g.rule,
        distractors: [g.wrong],
      })),
  ];

  return (
    <div>
      <PageHeader
        title="Practice"
        description="Flip flashcards or take a quiz. Quiz options are deliberately confusable — read carefully!"
      />
      <PracticeView cards={cards} ttsLang={LANGS[lang].ttsLang} />
    </div>
  );
}

import { PageHeader } from "@/components/page-header";
import {
  PracticeView,
  type PracticeCard,
} from "@/components/views/practice-view";
import { getExpressions, getVocabulary } from "@/lib/content";
import { LANGS, type Lang } from "@/lib/types";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };

  const cards: PracticeCard[] = [
    ...getVocabulary(lang).map((v) => ({
      id: `vocab-${v.id}`,
      front: v.word,
      back: v.meaning,
      speak: v.reading ?? v.word,
      kind: "word",
    })),
    ...getExpressions(lang).map((e) => ({
      id: `expr-${e.id}`,
      front: e.ko,
      back: e.text,
      speak: e.text,
      kind: "expression",
    })),
  ];

  return (
    <div>
      <PageHeader
        title="Practice"
        description="Flip flashcards or take a quick quiz to test yourself."
      />
      <PracticeView cards={cards} ttsLang={LANGS[lang].ttsLang} />
    </div>
  );
}

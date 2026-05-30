import { PageHeader } from "@/components/page-header";
import {
  PracticeView,
  type PracticeCard,
} from "@/components/views/practice-view";
import { getExpressions, getVocabulary } from "@/lib/content";

export const metadata = { title: "Practice · Study English" };

export default function PracticePage() {
  const cards: PracticeCard[] = [
    ...getVocabulary().map((v) => ({
      id: `vocab-${v.id}`,
      front: v.word,
      back: v.meaning,
      kind: "word",
    })),
    ...getExpressions().map((e) => ({
      id: `expr-${e.id}`,
      front: e.ko,
      back: e.en,
      kind: "expression",
    })),
  ];

  return (
    <div>
      <PageHeader
        title="Practice"
        description="Flip flashcards or take a quick quiz to test yourself."
      />
      <PracticeView cards={cards} />
    </div>
  );
}

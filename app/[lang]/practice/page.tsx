import { PageHeader } from "@/components/page-header";
import { PracticeView } from "@/components/views/practice-view";
import { getExpressions, getGrammar, getVocabulary } from "@/lib/content";
import { expressionCards, grammarCards, vocabCards } from "@/lib/quiz";
import { LANGS, type Lang } from "@/lib/types";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };

  const cards = [
    ...vocabCards(getVocabulary(lang)),
    ...expressionCards(getExpressions(lang)),
    ...grammarCards(getGrammar(lang)),
  ];

  return (
    <div>
      <PageHeader
        title="Practice"
        description="Flip flashcards or take a quiz. Options are deliberately confusable — read carefully!"
      />
      <PracticeView cards={cards} ttsLang={LANGS[lang].ttsLang} />
    </div>
  );
}

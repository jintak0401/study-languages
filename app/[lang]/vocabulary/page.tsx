import { PageHeader } from "@/components/page-header";
import { VocabularyView } from "@/components/views/vocabulary-view";
import { getVocabulary } from "@/lib/content";
import { LANGS, type Lang } from "@/lib/types";

export default async function VocabularyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <div>
      <PageHeader
        title="Vocabulary"
        description="Words and phrases to remember, with meanings and examples."
      />
      <VocabularyView items={getVocabulary(lang)} ttsLang={LANGS[lang].ttsLang} />
    </div>
  );
}

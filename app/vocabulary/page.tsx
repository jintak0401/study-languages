import { PageHeader } from "@/components/page-header";
import { VocabularyView } from "@/components/views/vocabulary-view";
import { getVocabulary } from "@/lib/content";

export const metadata = { title: "Vocabulary · Study English" };

export default function VocabularyPage() {
  return (
    <div>
      <PageHeader
        title="Vocabulary"
        description="Words and phrases to remember, with meanings and examples."
      />
      <VocabularyView items={getVocabulary()} />
    </div>
  );
}

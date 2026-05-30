import { PageHeader } from "@/components/page-header";
import { GrammarView } from "@/components/views/grammar-view";
import { getGrammar } from "@/lib/content";
import { LANGS, type Lang } from "@/lib/types";

export default async function GrammarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <div>
      <PageHeader
        title="Grammar"
        description="Rules you've learned, each with a wrong vs. right example."
      />
      <GrammarView items={getGrammar(lang)} ttsLang={LANGS[lang].ttsLang} />
    </div>
  );
}

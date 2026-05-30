import { PageHeader } from "@/components/page-header";
import { ExpressionsView } from "@/components/views/expressions-view";
import { getExpressions } from "@/lib/content";
import { LANGS, type Lang } from "@/lib/types";

export default async function ExpressionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <div>
      <PageHeader
        title="Expressions"
        description="Useful phrases — with different ways to say the same thing."
      />
      <ExpressionsView items={getExpressions(lang)} ttsLang={LANGS[lang].ttsLang} />
    </div>
  );
}

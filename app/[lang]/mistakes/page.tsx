import { PageHeader } from "@/components/page-header";
import { MistakesView } from "@/components/views/mistakes-view";
import { getMistakes } from "@/lib/content";
import type { Lang } from "@/lib/types";

export default async function MistakesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <div>
      <PageHeader
        title="Your mistakes"
        description="Every wrong point, with the fix. Repeated ones are flagged ⚠️."
      />
      <MistakesView items={getMistakes(lang)} />
    </div>
  );
}

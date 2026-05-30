import { PageHeader } from "@/components/page-header";
import { PlanView } from "@/components/views/plan-view";
import { getPlan } from "@/lib/content";
import type { Lang } from "@/lib/types";

export default async function PlanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const plan = getPlan(lang);
  return (
    <div>
      <PageHeader title={plan.title} description="Check off steps as you learn." />
      <PlanView plan={plan} lang={lang} />
    </div>
  );
}

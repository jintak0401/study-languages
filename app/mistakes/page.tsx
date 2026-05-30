import { PageHeader } from "@/components/page-header";
import { MistakesView } from "@/components/views/mistakes-view";
import { getMistakes } from "@/lib/content";

export const metadata = { title: "Mistakes · Study English" };

export default function MistakesPage() {
  return (
    <div>
      <PageHeader
        title="Your mistakes"
        description="Every wrong point, with the fix. Repeated ones are flagged ⚠️."
      />
      <MistakesView items={getMistakes()} />
    </div>
  );
}

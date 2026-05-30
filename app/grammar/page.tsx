import { PageHeader } from "@/components/page-header";
import { GrammarView } from "@/components/views/grammar-view";
import { getGrammar } from "@/lib/content";

export const metadata = { title: "Grammar · Study English" };

export default function GrammarPage() {
  return (
    <div>
      <PageHeader
        title="Grammar"
        description="Rules you've learned, each with a wrong vs. right example."
      />
      <GrammarView items={getGrammar()} />
    </div>
  );
}

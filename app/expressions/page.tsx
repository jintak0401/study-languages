import { PageHeader } from "@/components/page-header";
import { ExpressionsView } from "@/components/views/expressions-view";
import { getExpressions } from "@/lib/content";

export const metadata = { title: "Expressions · Study English" };

export default function ExpressionsPage() {
  return (
    <div>
      <PageHeader
        title="Expressions"
        description="Useful phrases — with different ways to say the same thing."
      />
      <ExpressionsView items={getExpressions()} />
    </div>
  );
}

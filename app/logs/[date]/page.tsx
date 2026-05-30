import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MarkdownView } from "@/components/markdown";
import { getLog, getLogList } from "@/lib/content";

export function generateStaticParams() {
  return getLogList().map((l) => ({ date: l.date }));
}

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const log = await getLog(date);
  if (!log) notFound();

  return (
    <article className="space-y-6">
      <Link
        href="/logs"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All logs
      </Link>
      <MarkdownView>{log.body}</MarkdownView>
    </article>
  );
}

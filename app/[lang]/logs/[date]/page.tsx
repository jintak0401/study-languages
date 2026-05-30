import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MarkdownView } from "@/components/markdown";
import { getLog, getLogList } from "@/lib/content";
import { LANGS, type Lang } from "@/lib/types";

export function generateStaticParams() {
  return (Object.keys(LANGS) as Lang[]).flatMap((lang) =>
    getLogList(lang).map((l) => ({ lang, date: l.date })),
  );
}

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; date: string }>;
}) {
  const { lang, date } = (await params) as { lang: Lang; date: string };
  const log = await getLog(lang, date);
  if (!log) notFound();

  return (
    <article className="space-y-6">
      <Link
        href={`/${lang}/logs`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All logs
      </Link>
      <MarkdownView>{log.body}</MarkdownView>
    </article>
  );
}

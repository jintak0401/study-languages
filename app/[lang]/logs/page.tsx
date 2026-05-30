import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { NoResults } from "@/components/search-bar";
import { getLogList } from "@/lib/content";
import { formatNice } from "@/lib/date";
import type { Lang } from "@/lib/types";

export default async function LogsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const logs = getLogList(lang);

  return (
    <div>
      <PageHeader
        title="Daily logs"
        description="A study record for each day — your 공부기록."
      />
      {logs.length === 0 ? (
        <NoResults>No study logs yet.</NoResults>
      ) : (
        <div className="grid gap-4">
          {logs.map((log) => (
            <Link
              key={log.date}
              href={`/${lang}/logs/${log.date}`}
              className="group"
            >
              <Card className="transition-colors group-hover:border-primary/50">
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <CalendarDays className="size-4" />
                    {formatNice(log.date)}
                  </div>
                  <p className="font-semibold">{log.title}</p>
                  <p className="text-sm text-muted-foreground">{log.summary}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary">
                    Open <ArrowRight className="size-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Dumbbell,
  GraduationCap,
  Languages,
  Route,
  TriangleAlert,
} from "lucide-react";

import type { Lang } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { TodayCard } from "@/components/today-card";
import { Card, CardContent } from "@/components/ui/card";
import { getContentStats, getLogList, getPlan } from "@/lib/content";
import { formatNice } from "@/lib/date";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Lang };
  const stats = getContentStats(lang);
  const latestLog = getLogList(lang)[0];
  const plan = getPlan(lang);

  const tiles = [
    { href: "expressions", label: "Expressions", count: stats.expressions, icon: BookOpenText },
    { href: "grammar", label: "Grammar", count: stats.grammar, icon: GraduationCap },
    { href: "vocabulary", label: "Vocabulary", count: stats.vocabulary, icon: Languages },
    { href: "mistakes", label: "Mistakes", count: stats.mistakes, icon: TriangleAlert },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={lang === "ja" ? "がんばろう 👋" : "Welcome back 👋"}
        description="A little every day adds up. Let's study."
      />

      <TodayCard />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map(({ href, label, count, icon: Icon }) => (
          <Link key={href} href={`/${lang}/${href}`} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/50">
              <CardContent className="flex flex-col gap-2 p-4">
                <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href={`/${lang}/plan`} className="group">
          <Card className="h-full transition-colors group-hover:border-primary/50">
            <CardContent className="space-y-2 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Route className="size-4" /> Study plan
              </div>
              <p className="font-semibold">{plan.title}</p>
              <p className="text-sm text-muted-foreground">
                {stats.planStages} stages to work through.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary">
                Open <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
        {latestLog && (
          <Link href={`/${lang}/logs/${latestLog.date}`} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/50">
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <CalendarDays className="size-4" /> Latest study log
                </div>
                <p className="font-semibold">{latestLog.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatNice(latestLog.date)}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-primary">
                  Read it <ArrowRight className="size-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        )}
        <Link href={`/${lang}/practice`} className="group">
          <Card className="h-full transition-colors group-hover:border-primary/50">
            <CardContent className="space-y-2 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Dumbbell className="size-4" /> Practice
              </div>
              <p className="font-semibold">Flashcards &amp; quizzes</p>
              <p className="text-sm text-muted-foreground">
                Test yourself on words and expressions.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary">
                Start <ArrowRight className="size-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

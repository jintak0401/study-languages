import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Dumbbell,
  GraduationCap,
  Languages,
  TriangleAlert,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { TodayCard } from "@/components/today-card";
import { Card, CardContent } from "@/components/ui/card";
import { getContentStats, getLogList } from "@/lib/content";
import { formatNice } from "@/lib/date";

export default function DashboardPage() {
  const stats = getContentStats();
  const latestLog = getLogList()[0];

  const tiles = [
    {
      href: "/expressions",
      label: "Expressions",
      count: stats.expressions,
      icon: BookOpenText,
    },
    {
      href: "/grammar",
      label: "Grammar",
      count: stats.grammar,
      icon: GraduationCap,
    },
    {
      href: "/vocabulary",
      label: "Vocabulary",
      count: stats.vocabulary,
      icon: Languages,
    },
    {
      href: "/mistakes",
      label: "Mistakes",
      count: stats.mistakes,
      icon: TriangleAlert,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back 👋"
        description="A little every day adds up. Let's study English."
      />

      <TodayCard />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map(({ href, label, count, icon: Icon }) => (
          <Link key={href} href={href} className="group">
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
        {latestLog && (
          <Link href={`/logs/${latestLog.date}`} className="group">
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
        <Link href="/practice" className="group">
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

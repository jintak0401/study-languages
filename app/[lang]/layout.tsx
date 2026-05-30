import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";

import { isLang, type Lang } from "@/lib/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangSwitcher } from "@/components/lang-switcher";
import { MobileNav, SidebarNav } from "@/components/app-nav";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ja" }];
}

function Brand({ lang }: { lang: Lang }) {
  return (
    <Link href={`/${lang}`} className="flex items-center gap-2 font-semibold">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="size-4" />
      </span>
      <span>Study Languages</span>
    </Link>
  );
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-6 border-r border-border bg-card px-3 py-5 md:flex">
        <div className="flex items-center justify-between px-2">
          <Brand lang={lang} />
        </div>
        <div className="px-2">
          <LangSwitcher />
        </div>
        <SidebarNav lang={lang} />
        <div className="mt-auto flex items-center justify-between px-2">
          <span className="text-xs text-muted-foreground">30 min a day 🎯</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 flex flex-col gap-2 border-b border-border bg-card/80 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex items-center justify-between">
            <Brand lang={lang} />
            <div className="flex items-center gap-2">
              <LangSwitcher />
              <ThemeToggle />
            </div>
          </div>
          <MobileNav lang={lang} />
        </header>

        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

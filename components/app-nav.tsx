"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  GraduationCap,
  type LucideIcon,
  CalendarDays,
  Dumbbell,
  Home,
  Languages,
  ListChecks,
  Route,
  TriangleAlert,
} from "lucide-react";

import type { Lang } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NavItem {
  /** Path suffix appended after `/${lang}`. Empty string = dashboard. */
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "", label: "Dashboard", icon: Home },
  { href: "/expressions", label: "Expressions", icon: BookOpenText },
  { href: "/grammar", label: "Grammar", icon: GraduationCap },
  { href: "/vocabulary", label: "Vocabulary", icon: Languages },
  { href: "/mistakes", label: "Mistakes", icon: TriangleAlert },
  { href: "/plan", label: "Study Plan", icon: Route },
  { href: "/logs", label: "Daily logs", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: ListChecks },
  { href: "/practice", label: "Practice", icon: Dumbbell },
];

function isActive(pathname: string, full: string, isDashboard: boolean) {
  if (isDashboard) return pathname === full;
  return pathname === full || pathname.startsWith(`${full}/`);
}

function NavLinks({
  lang,
  orientation,
}: {
  lang: Lang;
  orientation: "vertical" | "horizontal";
}) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        orientation === "vertical"
          ? "flex flex-col gap-1"
          : "no-scrollbar flex gap-1 overflow-x-auto pb-1",
      )}
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const full = `/${lang}${href}`;
        const active = isActive(pathname, full, href === "");
        return (
          <Link
            key={href || "dashboard"}
            href={full}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              orientation === "vertical" ? "gap-3" : "shrink-0",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SidebarNav({ lang }: { lang: Lang }) {
  return <NavLinks lang={lang} orientation="vertical" />;
}

export function MobileNav({ lang }: { lang: Lang }) {
  return <NavLinks lang={lang} orientation="horizontal" />;
}

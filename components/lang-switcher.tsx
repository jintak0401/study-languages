"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LANGS, type Lang } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Switches the language by swapping the first path segment (keeps the sub-route). */
export function LangSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const current = segments[1];

  const hrefFor = (lang: Lang) => {
    const next = [...segments];
    next[1] = lang;
    return next.join("/") || `/${lang}`;
  };

  return (
    <div className="inline-flex rounded-md border border-border p-0.5">
      {(Object.keys(LANGS) as Lang[]).map((lang) => (
        <Link
          key={lang}
          href={hrefFor(lang)}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-colors",
            current === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {LANGS[lang].label}
        </Link>
      ))}
    </div>
  );
}

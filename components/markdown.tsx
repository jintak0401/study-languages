import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

/** Renders study-note markdown (GFM tables, etc.) with the app's styling. */
export function MarkdownView({ children }: { children: string }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ className, ...p }) => (
            <h1 className={cn("text-2xl font-bold", className)} {...p} />
          ),
          h2: ({ className, ...p }) => (
            <h2
              className={cn("mt-6 text-xl font-semibold", className)}
              {...p}
            />
          ),
          h3: ({ className, ...p }) => (
            <h3
              className={cn("mt-4 text-lg font-semibold", className)}
              {...p}
            />
          ),
          p: ({ className, ...p }) => <p className={cn(className)} {...p} />,
          ul: ({ className, ...p }) => (
            <ul className={cn("list-disc space-y-1 pl-6", className)} {...p} />
          ),
          ol: ({ className, ...p }) => (
            <ol
              className={cn("list-decimal space-y-1 pl-6", className)}
              {...p}
            />
          ),
          a: ({ className, ...p }) => (
            <a
              className={cn("text-primary underline underline-offset-2", className)}
              {...p}
            />
          ),
          blockquote: ({ className, ...p }) => (
            <blockquote
              className={cn(
                "border-l-4 border-primary/40 bg-accent/40 py-2 pl-4 italic",
                className,
              )}
              {...p}
            />
          ),
          code: ({ className, ...p }) => (
            <code
              className={cn(
                "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]",
                className,
              )}
              {...p}
            />
          ),
          hr: ({ className, ...p }) => (
            <hr className={cn("border-border", className)} {...p} />
          ),
          table: ({ className, ...p }) => (
            <div className="overflow-x-auto">
              <table
                className={cn(
                  "w-full border-collapse text-left text-sm",
                  className,
                )}
                {...p}
              />
            </div>
          ),
          th: ({ className, ...p }) => (
            <th
              className={cn(
                "border border-border bg-muted px-3 py-2 font-semibold",
                className,
              )}
              {...p}
            />
          ),
          td: ({ className, ...p }) => (
            <td
              className={cn("border border-border px-3 py-2 align-top", className)}
              {...p}
            />
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}

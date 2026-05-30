import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Sparkles } from "lucide-react";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav, SidebarNav } from "@/components/app-nav";
import { PwaRegister } from "@/components/pwa-register";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study English",
  description: "A personal space to study English — anywhere, anytime.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Study EN",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
};

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="size-4" />
      </span>
      <span>Study English</span>
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PwaRegister />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            {/* Desktop sidebar */}
            <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-6 border-r border-border bg-card px-3 py-5 md:flex">
              <div className="px-2">
                <Brand />
              </div>
              <SidebarNav />
              <div className="mt-auto flex items-center justify-between px-2">
                <span className="text-xs text-muted-foreground">
                  30 min a day 🎯
                </span>
                <ThemeToggle />
              </div>
            </aside>

            {/* Main column */}
            <div className="flex min-w-0 flex-1 flex-col">
              {/* Mobile header */}
              <header className="sticky top-0 z-10 flex flex-col gap-2 border-b border-border bg-card/80 px-4 py-3 backdrop-blur md:hidden">
                <div className="flex items-center justify-between">
                  <Brand />
                  <ThemeToggle />
                </div>
                <MobileNav />
              </header>

              <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 md:px-8">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

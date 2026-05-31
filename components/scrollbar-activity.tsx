"use client";

import { useEffect } from "react";

/**
 * Reveals the custom scrollbar while scrolling and auto-hides it ~700ms after
 * scrolling stops, by toggling a `scrolling` class on <html> (styled in
 * globals.css). Capture phase so it catches scrolls on any nested container.
 */
export function ScrollbarActivity() {
  useEffect(() => {
    const root = document.documentElement;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      root.classList.add("scrolling");
      clearTimeout(timer);
      timer = setTimeout(() => root.classList.remove("scrolling"), 700);
    };
    const opts = { capture: true, passive: true } as const;
    window.addEventListener("scroll", onScroll, opts);
    return () => {
      window.removeEventListener("scroll", onScroll, opts);
      clearTimeout(timer);
    };
  }, []);

  return null;
}

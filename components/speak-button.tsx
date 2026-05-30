"use client";

import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

/** Reads text aloud via the Web Speech API. Hidden if the browser has no TTS. */
export function SpeakButton({
  text,
  lang,
  className,
}: {
  text: string;
  /** BCP-47 tag, e.g. "en-US" or "ja-JP". */
  lang: string;
  className?: string;
}) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" && "speechSynthesis" in window,
    );
  }, []);

  if (!supported) return null;

  const speak = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    const base = lang.split("-")[0];
    const voice = synth
      .getVoices()
      .find((v) => v.lang === lang) ??
      synth.getVoices().find((v) => v.lang.startsWith(base));
    if (voice) utter.voice = voice;
    synth.speak(utter);
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label="Listen"
      title="Listen"
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        className,
      )}
    >
      <Volume2 className="size-4" />
    </button>
  );
}

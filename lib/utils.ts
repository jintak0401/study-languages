import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, resolving conflicts (design-system helper). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

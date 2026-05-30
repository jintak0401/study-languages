/** Date helpers used across the app. All dates are local "YYYY-MM-DD" strings. */

export function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayKey(): string {
  return toKey(new Date());
}

/** Keys for the last `n` days, oldest first (includes today). */
export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const base = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    out.push(toKey(d));
  }
  return out;
}

/** Current consecutive-day streak ending today (or yesterday). */
export function computeStreak(studiedDates: string[]): number {
  const set = new Set(studiedDates);
  let streak = 0;
  const cursor = new Date();
  // Allow the streak to count even if today isn't done yet (starts from yesterday).
  if (!set.has(toKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(toKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

const FMT = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatNice(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  return FMT.format(new Date(y, m - 1, d));
}

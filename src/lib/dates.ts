/** Newest first, without mutating the input. */
export function sortByDate<T extends { date: string }>(
  items: readonly T[],
): T[] {
  return items.toSorted((a, b) => b.date.localeCompare(a.date));
}

const dayFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-11-17T00:00:00.000Z" → "17 November 2026" */
export function formatDate(iso: string): string {
  return dayFormat.format(new Date(iso));
}

/** ("2020-06", "2022-12") → "Jun 2020 – Dec 2022"; a missing end means the role is current. */
export function formatMonthRange(start: string, end?: string): string {
  const format = (month: string) =>
    monthFormat.format(new Date(`${month}-01T00:00:00Z`));
  return `${format(start)} – ${end ? format(end) : "Present"}`;
}

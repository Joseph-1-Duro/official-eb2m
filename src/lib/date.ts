/** Date helpers for the events section.
 *
 *  Everything here avoids constructing a Date from an ISO date string:
 *  "2027-01-14" parses as UTC midnight, which is the 13th in any
 *  negative-offset build timezone. Only whole days matter here, so the
 *  string components are used directly. */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type DateParts = {
  day: string;
  month: string;
  year: string;
};

/** Today as YYYY-MM-DD in the *server's local* zone, not UTC — otherwise
 *  midnight-to-1am builds would treat this morning as yesterday and hide an
 *  event happening today. */
export function toLocalIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Splits YYYY-MM-DD into display parts without any timezone conversion. */
export function parseIsoDate(iso: string): DateParts {
  const [year, month, day] = iso.split("-");
  return {
    day,
    month: MONTHS[Number(month) - 1] ?? "",
    year,
  };
}
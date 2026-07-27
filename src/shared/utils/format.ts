const persianNumberFormatter = new Intl.NumberFormat("fa-IR");
const persianCompactFormatter = new Intl.NumberFormat("fa-IR", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const persianDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatNumber(value: number | null | undefined) {
  return persianNumberFormatter.format(value ?? 0);
}

export function formatCompactNumber(value: number | null | undefined) {
  return persianCompactFormatter.format(value ?? 0);
}

export function formatPersianDate(value: string | Date | null | undefined) {
  if (!value) return "-";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return persianDateFormatter.format(date);
}

export function toPersianDigits(value: string | number) {
  return String(value).replace(
    /\d/g,
    (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] ?? digit,
  );
}

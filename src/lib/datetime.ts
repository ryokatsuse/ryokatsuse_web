import { Temporal } from 'temporal-polyfill';

const TIME_ZONE = 'Asia/Tokyo';
const LOCALE = 'ja-JP';

type DateInput = Date | string | number;

function toZonedDateTime(value: DateInput): Temporal.ZonedDateTime {
  const epochMs =
    value instanceof Date
      ? value.getTime()
      : typeof value === 'number'
        ? value
        : new Date(value).getTime();
  return Temporal.Instant.fromEpochMilliseconds(epochMs).toZonedDateTimeISO(
    TIME_ZONE,
  );
}

export function epochMilliseconds(value: DateInput): number {
  return toZonedDateTime(value).epochMilliseconds;
}

export function toISOString(value: DateInput): string {
  return toZonedDateTime(value).toInstant().toString();
}

export function formatLongDate(value: DateInput): string {
  return toZonedDateTime(value).toLocaleString(LOCALE, { dateStyle: 'long' });
}

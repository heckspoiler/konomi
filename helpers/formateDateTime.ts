import { TimestampField } from '@prismicio/client';

export function formatDateTime(isoString: string | TimestampField) {
  const date = new Date(isoString as string);

  // Get day and month with leading zeros
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Get time
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const timeOnly = `${hours}:${minutes}`;
  const dayOnly = `${day}.${month}`;
  const dayAndTime = `${day}.${month}, ${hours}:${minutes}`;
  const dayMonthYear = `${day}.${month}.${year}`;

  return {
    timeOnly,
    dayOnly,
    dayMonthYear,
    dayAndTime,
    hours,
    minutes,
    day,
    month,
    year,
  };
}

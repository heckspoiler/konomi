import { EventDocument } from '@/prismicio-types';

/** Tag editors can set in Prismic to force an event into the archive. */
const ARCHIVED_TAG = 'archived';

const toTime = (value: string | null | undefined) =>
  value ? new Date(value).getTime() : NaN;

export const startTime = (event: EventDocument) =>
  toTime(event.data.event_start_date);

/** End of the event, falling back to the start when no end is set. */
export const endTime = (event: EventDocument) => {
  const end = toTime(event.data.event_end_date);
  return Number.isNaN(end) ? startTime(event) : end;
};

/**
 * The single definition of "upcoming" used across the site: the event hasn't
 * ended yet and hasn't been manually archived.
 */
export const isUpcoming = (event: EventDocument, now = Date.now()) =>
  !event.tags.includes(ARCHIVED_TAG) && endTime(event) > now;

export const isPast = (event: EventDocument, now = Date.now()) =>
  !isUpcoming(event, now);

export const sortByStart = (
  events: EventDocument[],
  direction: 'asc' | 'desc' = 'asc',
) =>
  [...events].sort((a, b) =>
    direction === 'asc'
      ? startTime(a) - startTime(b)
      : startTime(b) - startTime(a),
  );

/**
 * The year of the next edition: one after the latest event we know about.
 * Using the data rather than today's date keeps it correct in January, before
 * the new programme is published.
 */
export const nextEditionYear = (events: EventDocument[]) => {
  const years = events
    .map((event) => new Date(startTime(event)).getFullYear())
    .filter((year) => !Number.isNaN(year));
  const latest = years.length ? Math.max(...years) : new Date().getFullYear();
  return latest + 1;
};

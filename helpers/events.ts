import { EventDocument } from '@/prismicio-types';

/** Fields the event lists, filters and homepage programme actually use. */
export const EVENT_SUMMARY_FIELDS = [
  'event_title',
  'event_location',
  'event_street',
  'event_postcode_and_city',
  'event_start_date',
  'event_end_date',
  'google_location_link',
  'is_food',
  'is_drinks',
  'is_music',
  'is_lecture',
  'is_crafting',
  'is_art',
] as const satisfies readonly (keyof EventDocument['data'])[];

type SummaryField = (typeof EVENT_SUMMARY_FIELDS)[number];

/**
 * A slim event for client components. Same shape as an EventDocument
 * (`event.data.x`) but without descriptions, galleries, images and SEO
 * fields, which keeps the page payload small.
 */
export type EventSummary = Pick<EventDocument, 'id' | 'uid' | 'url' | 'tags'> & {
  data: Pick<EventDocument['data'], SummaryField>;
};

/** Anything with dates and tags – full documents or summaries. */
type DatedEvent = Pick<EventDocument, 'tags'> & {
  data: Pick<EventDocument['data'], 'event_start_date' | 'event_end_date'>;
};

export const toEventSummary = (event: EventDocument): EventSummary => ({
  id: event.id,
  uid: event.uid,
  url: event.url,
  tags: event.tags,
  data: Object.fromEntries(
    EVENT_SUMMARY_FIELDS.map((field) => [field, event.data[field]]),
  ) as EventSummary['data'],
});

/** Tag editors can set in Prismic to force an event into the archive. */
const ARCHIVED_TAG = 'archived';

const toTime = (value: string | null | undefined) =>
  value ? new Date(value).getTime() : NaN;

export const startTime = (event: DatedEvent) =>
  toTime(event.data.event_start_date);

/** End of the event, falling back to the start when no end is set. */
export const endTime = (event: DatedEvent) => {
  const end = toTime(event.data.event_end_date);
  return Number.isNaN(end) ? startTime(event) : end;
};

/**
 * The single definition of "upcoming" used across the site: the event hasn't
 * ended yet and hasn't been manually archived.
 */
export const isUpcoming = (event: DatedEvent, now = Date.now()) =>
  !event.tags.includes(ARCHIVED_TAG) && endTime(event) > now;

export const isPast = (event: DatedEvent, now = Date.now()) =>
  !isUpcoming(event, now);

export const sortByStart = <T extends DatedEvent>(
  events: T[],
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
export const nextEditionYear = (events: DatedEvent[]) => {
  const years = events
    .map((event) => new Date(startTime(event)).getFullYear())
    .filter((year) => !Number.isNaN(year));
  const latest = years.length ? Math.max(...years) : new Date().getFullYear();
  return latest + 1;
};

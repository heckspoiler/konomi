import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import sm from '../slicemachine.config.json';
import {
  EVENT_SUMMARY_FIELDS,
  isPast,
  isUpcoming,
  nextEditionYear,
  sortByStart,
  toEventSummary,
} from '@helpers/events';

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 */
const routes: prismic.ClientConfig['routes'] = [
  { type: 'page', path: '/', uid: 'home' },
  { type: 'events', path: '/events', uid: 'events' },
  { type: 'event', path: '/events/:uid' },
  { type: 'archive', path: '/archive', uid: 'archive' },
  { type: 'about', path: '/about', uid: 'about' },
  { type: 'impressum', path: '/impressum', uid: 'impressum' },
  { type: 'news', path: '/news', uid: 'news' },
  { type: 'newsarticle', path: '/news/:uid' },
  { type: 'gallery', path: '/gallery', uid: 'gallery' },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint || repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};

/**
 * Events split into upcoming (soonest first) and past (newest first), as slim
 * summaries for client components. Only the summary fields are requested from
 * Prismic.
 *
 * "Now" is the render time; pages using this revalidate hourly, and the client
 * re-checks against the real clock so nothing ended stays listed as upcoming.
 */
export const getEventLists = async () => {
  const events = await createClient().getAllByType('event', {
    fetch: EVENT_SUMMARY_FIELDS.map((field) => `event.${field}`),
    orderings: [{ field: 'my.event.event_start_date', direction: 'asc' }],
  });

  const now = Date.now();
  const summaries = events.map(toEventSummary);

  return {
    upcoming: summaries.filter((event) => isUpcoming(event, now)),
    past: sortByStart(
      summaries.filter((event) => isPast(event, now)),
      'desc',
    ),
    nextYear: nextEditionYear(summaries),
  };
};

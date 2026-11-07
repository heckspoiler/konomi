import { Metadata } from 'next';
import { asImageSrc } from '@prismicio/client';
import { createClient, getEventLists } from '@/prismicio';

import HomepageContent from './components/Homepage/HomepageContent/HomepageContent';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: asImageSrc(home.data.meta_image) ?? '' }],
    },
  };
}

/** Re-split upcoming/past events at least hourly, even without a publish. */
export const revalidate = 3600;

export default async function Index() {
  const client = createClient();
  const [home, landingCategories, downloadBar, news, eventLists] =
    await Promise.all([
      client.getByUID('page', 'home'),
      client.getSingle('landing_categories'),
      client.getSingle('download_bar'),
      client.getAllByType('newsarticle', {
        limit: 10,
        orderings: [
          { field: 'my.newsarticle.publishing_date', direction: 'desc' },
        ],
      }),
      getEventLists(),
    ]);

  const slices = home.data.slices;
  const basicSlices = slices.filter(
    (slice) => slice.slice_type === 'basic_slice',
  );
  const byVariation = (variation: string) =>
    basicSlices.filter((slice) => slice.variation === variation);

  return (
    <HomepageContent
      defaultVariationSlice={byVariation('default')}
      scheduleSlice={byVariation('schedule')}
      newsSlice={byVariation('news')}
      galleryDefaultSlice={slices.filter(
        (slice) => slice.slice_type === 'landing_gallery',
      )}
      landingCategories={landingCategories}
      downloadBar={downloadBar}
      news={news}
      // A few extra in case some end before the next revalidation.
      upcomingEvents={eventLists.upcoming.slice(0, 15)}
      nextYear={eventLists.nextYear}
    />
  );
}

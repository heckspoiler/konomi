// page.tsx
import { Metadata } from 'next';
import { createClient } from '@/prismicio';

import HomepageContent from './components/Homepage/HomepageContent/HomepageContent';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? '' }],
    },
  };
}

export default async function Index() {
  const client = createClient();
  const home = await client.getByUID('page', 'home');
  const events = await client.getAllByType('event');

  const defaultVariationSlice = home.data.slices.filter(
    (slice) => slice.variation === 'default'
  );

  const scheduleSlice = home.data.slices.filter(
    (slice) => slice.variation === 'schedule'
  );

  const konomiSlice = home.data.slices.filter(
    (slice) => slice.variation === 'whoIsKonomi'
  );

  const whySlice = home.data.slices.filter(
    (slice) => slice.variation === 'whyKonomi'
  );

  return (
    <HomepageContent
      eventsPass={events}
      defaultVariationSlice={defaultVariationSlice}
      scheduleSlice={scheduleSlice}
      konomiSlice={konomiSlice}
      whySlice={whySlice}
    />
  );
}

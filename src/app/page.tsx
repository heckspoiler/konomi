import { Metadata } from 'next';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import HomepageContent from './components/Homepage/HomepageContent/HomepageContent';

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

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
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  const events = await client.getAllByType('event');

  const defaultVariationSlice = home.data.slices.filter((slice) => {
    return slice.variation === 'default';
  });

  const scheduleSlice = home.data.slices.filter((slice) => {
    return slice.variation === 'schedule';
  });

  const konomiSlice = home.data.slices.filter((slice) => {
    return slice.variation === 'whoIsKonomi';
  });

  const whySlice = home.data.slices.filter((slice) => {
    return slice.variation === 'whyKonomi';
  });

  return (
    <HomepageContent
      events={events}
      defaultVariationSlice={defaultVariationSlice}
      scheduleSlice={scheduleSlice}
      konomiSlice={konomiSlice}
      whySlice={whySlice}
      components={components}
    />
  );
}

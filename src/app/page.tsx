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
  const landingCategories = await client.getSingle('landing_categories');
  const downloadBar = await client.getSingle('download_bar');
  const newsFetch = await client.getAllByType('newsarticle', {
    limit: 10,
  });

  const news = newsFetch.sort((a, b) => {
    return (
      new Date(a.data.publishing_date as string).getTime() -
      new Date(b.data.publishing_date as string).getTime()
    );
  });

  const defaultSlice = home.data.slices.filter(
    (slice) => slice.slice_type === 'basic_slice',
  );

  const gallerySlice = home.data.slices.filter(
    (slice) => slice.slice_type === 'landing_gallery',
  );

  const defaultVariationSlice = defaultSlice.filter(
    (slice) => slice.variation === 'default',
  );

  const scheduleSlice = defaultSlice.filter(
    (slice) => slice.variation === 'schedule',
  );

  const newsSlice = defaultSlice.filter((slice) => slice.variation === 'news');

  const konomiSlice = defaultSlice.filter(
    (slice) => slice.variation === 'whoIsKonomi',
  );

  const galleryDefaultSlice = gallerySlice.filter(
    (slice) => slice.slice_type === 'landing_gallery',
  );

  return (
    <HomepageContent
      defaultVariationSlice={defaultVariationSlice}
      scheduleSlice={scheduleSlice}
      konomiSlice={konomiSlice}
      galleryDefaultSlice={galleryDefaultSlice}
      landingCategories={landingCategories}
      downloadBar={downloadBar}
      newsSlice={newsSlice}
      news={news}
    />
  );
}

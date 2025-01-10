import { Metadata } from 'next';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import styles from './page.module.css';

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

  console.log(defaultVariationSlice);

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <SliceZone slices={defaultVariationSlice} components={components} />;
        <SliceZone slices={scheduleSlice} components={components} />;
        {events.map((event) => (
          <div key={event.id}>
            <PrismicRichText field={event.data.event_title} />
            <p>{event.data.event_start_date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

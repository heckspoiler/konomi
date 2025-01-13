import { Metadata } from 'next';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import SectionContainer from './components/Homepage/SectionContainer/SectionContainer';

import styles from './page.module.css';
import AboutSection from './components/Homepage/AboutSection/AboutSection';
import EventSection from './components/Homepage/EventSection/EventSection';

import KonomiSection from './components/Homepage/KonomiSection/KonomiSection';

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

  console.log(defaultVariationSlice);

  return (
    <section className={styles.main}>
      <div id="about">
        <AboutSection
          defaultVariationSlice={defaultVariationSlice}
          components={components}
        />
      </div>
      <div id="events">
        <EventSection
          scheduleSlice={scheduleSlice}
          components={components}
          events={events}
        />
      </div>
      <div id="#konomi">
        <KonomiSection konomiSlice={konomiSlice} components={components} />
      </div>
    </section>
  );
}

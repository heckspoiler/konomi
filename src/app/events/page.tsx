import { Metadata } from 'next';
import { PrismicRichText, SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import styles from './page.module.css';
import EventsContent from './components/EventsContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('events');
  return (
    <div className={styles.main}>
      <EventsContent page={page} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('events');
  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

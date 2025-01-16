import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import EventsContent from '../events/components/EventsContent';
import styles from './page.module.css';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('archive');

  const eventsFetch = await client.getAllByTag('event');

  const events = eventsFetch.filter((event: any) => {
    return event.tags.includes('archived');
  });

  return (
    <div className={styles.main}>
      <EventsContent events={events} page={page} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('archive');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

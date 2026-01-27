import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import EventsContent from '../events/components/EventsContent';
import styles from './page.module.css';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('archive');
  const searchicon = await client.getSingle('search_icon');

  return (
    <div className={styles.main}>
      <EventsContent page={page} searchicon={searchicon} />
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

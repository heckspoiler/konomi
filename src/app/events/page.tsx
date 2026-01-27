import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import styles from './page.module.css';
import EventsContent from './components/EventsContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('events');
  const searchicon = await client.getSingle('search_icon');
  return (
    <div className={styles.main}>
      <EventsContent page={page} searchicon={searchicon} />
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

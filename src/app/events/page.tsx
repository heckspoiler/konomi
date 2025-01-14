import { Metadata } from 'next';
import { PrismicRichText, SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import styles from './page.module.css';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('events');

  const events = await client.getAllByType('event');

  console.log(events);

  return (
    <div className={styles.main}>
      <div className={styles.eventContainer}>
        <PrismicRichText field={page.data.page_title} />
        {events.map((event, index) => {
          return (
            <div key={index} className={styles.event}>
              <div className={styles.leftContainer}></div>
              <div className={styles.rightContainer}>
                <PrismicRichText field={event.data.event_title} />
              </div>
            </div>
          );
        })}
      </div>
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

import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import styles from './page.module.css';
import ImpressumContent from './components/ImpressumContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('impressum');

  const content = page.data;

  return (
    <div className={styles.main}>
      <ImpressumContent content={content} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('impressum');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import styles from './page.module.css';
import ImpressumContent from './components/ImpressumContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('impressum');

  const content = page;

  return (
    <div className={styles.main}>
      <ImpressumContent page={page} />
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

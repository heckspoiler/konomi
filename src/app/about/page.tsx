import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import styles from './page.module.css';
import AboutContent from './components/AboutContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('about');

  return (
    <div className={styles.main}>
      <AboutContent page={page} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('about');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import styles from './page.module.css';
import NewsContent from './components/NewsContent';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('news');
  const articles = await client.getAllByType('newsarticle');

  return (
    <div className={styles.main}>
      <NewsContent page={page} articles={articles} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('news');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

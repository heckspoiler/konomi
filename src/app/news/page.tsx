import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import NewsContent from './components/NewsContent';
import MainContainer from '../components/MainContainer/MainContainer';

export default async function Page() {
  const client = createClient();
  const [page, articles] = await Promise.all([
    client.getSingle('news'),
    client.getAllByType('newsarticle', {
      orderings: [
        { field: 'my.newsarticle.publishing_date', direction: 'desc' },
      ],
    }),
  ]);

  return (
    <MainContainer>
      <NewsContent page={page} articles={articles} />
    </MainContainer>
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

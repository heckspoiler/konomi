import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import NewsContent from './components/NewsContent';
import MainContainer from '../components/MainContainer/MainContainer';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('news');
  const articles = await client.getAllByType('newsarticle');

  const sortedArticles = articles.sort((a, b) => {
    return (
      new Date(b.data.publishing_date as string).getTime() -
      new Date(a.data.publishing_date as string).getTime()
    );
  });

  return (
    <MainContainer>
      <NewsContent page={page} articles={sortedArticles} />
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

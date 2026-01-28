import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import AboutContent from './components/AboutContent';
import MainContainer from '../components/MainContainer/MainContainer';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('about');

  return (
    <MainContainer>
      <AboutContent page={page} />
    </MainContainer>
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

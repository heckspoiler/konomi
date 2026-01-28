import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import ImpressumContent from './components/ImpressumContent';
import MainContainer from '../components/MainContainer/MainContainer';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('impressum');

  return (
    <MainContainer>
      <ImpressumContent page={page} />
    </MainContainer>
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

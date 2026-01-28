import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import EventsContent from './components/EventsContent';
import MainContainer from '../components/MainContainer/MainContainer';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('events');
  const searchicon = await client.getSingle('search_icon');
  return (
    <MainContainer>
      <EventsContent page={page} searchicon={searchicon} />
    </MainContainer>
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

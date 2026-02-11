import { Metadata } from 'next';

import { createClient } from '@/prismicio';

import EventsContent from '../events/components/EventsContent';
import MainContainer from '../components/MainContainer/MainContainer';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('archive');
  const searchicon = await client.getSingle('search_icon');
  const archive = await client.getByType('event', {
    page: 1,
    pageSize: 20,
    orderings: [{ field: 'my.event.event_start_date', direction: 'asc' }],
  });

  console.log(archive);

  return (
    <MainContainer>
      <EventsContent page={page} searchicon={searchicon} />
    </MainContainer>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('archive');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

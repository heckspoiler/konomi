import { Metadata } from 'next';

import { createClient, getAllEvents } from '@/prismicio';

import EventsContent from '../events/components/EventsContent';
import MainContainer from '../components/MainContainer/MainContainer';

export default async function Page() {
  const client = createClient();
  const [page, searchicon, events] = await Promise.all([
    client.getSingle('archive'),
    client.getSingle('search_icon'),
    getAllEvents(),
  ]);

  return (
    <MainContainer>
      <EventsContent
        page={page}
        searchicon={searchicon}
        events={events}
        variant="archive"
      />
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

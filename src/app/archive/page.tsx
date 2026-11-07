import { Metadata } from 'next';

import { createClient, getEventLists } from '@/prismicio';

import EventsContent from '../events/components/EventsContent';
import MainContainer from '../components/MainContainer/MainContainer';

/** Re-split upcoming/past events at least hourly, even without a publish. */
export const revalidate = 3600;

export default async function Page() {
  const client = createClient();
  const [page, searchicon, eventLists] = await Promise.all([
    client.getSingle('archive'),
    client.getSingle('search_icon'),
    getEventLists(),
  ]);

  return (
    <MainContainer>
      <EventsContent
        page={page}
        searchicon={searchicon}
        events={eventLists.past}
        nextYear={eventLists.nextYear}
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

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styles from './EventsContent.module.css';
import MainHeading from './MainHeading';
import EventComponent from './EventComponent';
import BackToComponent from './BackToComponent';
import { usePathname } from 'next/navigation';
import FilterComponent from './FilterComponent';
import { FilterProvider, useFilter } from '@contexts/FilterContext';
import { formatDate } from '@helpers/formatDate';
import { asText } from '@prismicio/client';
import { useEvents } from '@contexts/EventsContext';
import {
  ArchiveDocument,
  EventDocument,
  EventsDocument,
  SearchIconDocument,
} from '@/prismicio-types';
import SearchContainer from './SearchContainer';
import { useSearchbarStore } from '@stores/useSearchStore';
import PageContainer from '@/app/components/PageContainer/PageContainer';

function EventsContentInner({
  page,
  events,
  searchicon,
}: {
  page: EventsDocument | ArchiveDocument;
  events: EventDocument[];
  searchicon: SearchIconDocument;
}) {
  const pathname = usePathname();
  const { selectedDate, selectedLocation, selectedEventType } = useFilter();
  const { query } = useSearchbarStore();
  const [isFoldoutOpen, setIsFoldoutOpen] = useState(false);
  const [usedEvents, setUsedEvents] = useState<EventDocument[]>([]);

  const now = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(
    () =>
      events?.filter(
        (event: EventDocument) =>
          new Date(event.data.event_end_date as string).getTime() >
          now.getTime(),
      ),
    [events, now],
  );

  const pastEvents = useMemo(
    () =>
      events?.filter(
        (event: EventDocument) =>
          new Date(event.data.event_end_date as string).getTime() <
          now.getTime(),
      ),
    [events, now],
  );

  useEffect(() => {
    if (pathname.startsWith('/events')) {
      setUsedEvents(upcomingEvents);
    } else if (pathname.startsWith('/archive')) {
      setUsedEvents(pastEvents);
    }
  }, [pathname, upcomingEvents, pastEvents]);

  const filteredEvents = usedEvents?.filter((event: EventDocument) => {
    const matchesDate =
      !selectedDate ||
      formatDate(event.data.event_start_date ?? '') === selectedDate;

    const matchesLocation =
      !selectedLocation ||
      asText(event.data.event_location) === selectedLocation;

    // Check event type based on boolean flags
    const matchesEventType =
      !selectedEventType ||
      (selectedEventType === 'food' && event.data.is_food) ||
      (selectedEventType === 'drinks' && event.data.is_drinks) ||
      (selectedEventType === 'music' && event.data.is_music) ||
      (selectedEventType === 'lecture' && event.data.is_lecture) ||
      (selectedEventType === 'crafting' && event.data.is_crafting) ||
      (selectedEventType === 'art' && event.data.is_art);

    // Check search query (normalize diacritics so e.g. ō matches o)
    const normalize = (s: string) =>
      s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const searchNorm = normalize(query);
    const matchesSearch =
      !query ||
      normalize(asText(event.data.event_title) ?? '').includes(searchNorm) ||
      normalize(asText(event.data.event_location) ?? '').includes(searchNorm);

    return matchesDate && matchesLocation && matchesEventType && matchesSearch;
  });

  const backComponent = useMemo(() => {
    if (pathname.startsWith('/events')) {
      return (
        <div className={styles.backToContainer}>
          <BackToComponent text="Archiv" url="/archive" />
        </div>
      );
    }
    if (pathname.startsWith('/archive')) {
      return <BackToComponent text="Events" url="/events" />;
    }
    return null;
  }, [pathname]);

  return (
    <PageContainer>
      <MainHeading page={page} />
      <div className={styles.eventsContainer}>
        <div className={styles.filtercontainer}>
          <div className={styles.backLinkContainer}>{backComponent}</div>
          <SearchContainer searchicon={searchicon} />
          <div className={`${isFoldoutOpen && styles.foldoutOpen}`}>
            <FilterComponent
              events={events}
              isFoldoutOpen={isFoldoutOpen}
              setIsFoldoutOpen={setIsFoldoutOpen}
            />
          </div>
        </div>
        {pathname.includes('archive') ? (
          filteredEvents
            ?.sort((a: EventDocument, b: EventDocument) => {
              return (
                new Date(a.data.event_start_date ?? '').getTime() -
                new Date(b.data.event_start_date ?? '').getTime()
              );
            })
            .map((event: EventDocument, index: number) => (
              <EventComponent key={index} event={event} />
            ))
        ) : upcomingEvents && upcomingEvents.length > 0 ? (
          filteredEvents
            ?.sort((a: EventDocument, b: EventDocument) => {
              return (
                new Date(a.data.event_start_date ?? '').getTime() -
                new Date(b.data.event_start_date ?? '').getTime()
              );
            })
            .map((event: EventDocument, index: number) => (
              <EventComponent key={index} event={event} />
            ))
        ) : (
          <h1>Wir sehen uns im 2026!</h1>
        )}
      </div>
    </PageContainer>
  );
}

function EventsContent({
  page,
  searchicon,
}: {
  page: EventsDocument | ArchiveDocument;
  searchicon: SearchIconDocument;
}) {
  const { events } = useEvents();

  return (
    <FilterProvider>
      <EventsContentInner page={page} events={events} searchicon={searchicon} />
    </FilterProvider>
  );
}

export default EventsContent;

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import styles from './EventsContent.module.css';
import MainHeading from './MainHeading';
import EventComponent from './EventComponent';
import BackToComponent from './BackToComponent';
import { usePathname } from 'next/navigation';
import FilterComponent from './FilterComponent';
import { FilterProvider, useFilter } from '../../../../contexts/FilterContext';
import { formatDate } from '../../../../helpers/formatDate';
import { useEvents } from '../../../../contexts/EventsContext';

function EventsContentInner({ page, events }: { page: any; events: any }) {
  const pathname = usePathname();
  const { selectedDate, selectedLocation, selectedEventType } = useFilter();
  const [isFoldoutOpen, setIsFoldoutOpen] = useState(false);
  const [usedEvents, setUsedEvents] = useState([]);

  const now = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(
    () =>
      events?.filter(
        (event: any) =>
          new Date(event.data.event_end_date).getTime() > now.getTime()
      ),
    [events, now]
  );

  const pastEvents = useMemo(
    () =>
      events?.filter(
        (event: any) =>
          new Date(event.data.event_end_date).getTime() < now.getTime()
      ),
    [events, now]
  );

  useEffect(() => {
    if (pathname.startsWith('/events')) {
      setUsedEvents(upcomingEvents);
    } else if (pathname.startsWith('/archive')) {
      setUsedEvents(pastEvents);
    }
  }, [pathname]);

  const filteredEvents = usedEvents?.filter((event: any) => {
    const matchesDate =
      !selectedDate || formatDate(event.data.event_start_date) === selectedDate;

    const matchesLocation =
      !selectedLocation ||
      event.data.event_location[0].text === selectedLocation;

    // Check event type based on boolean flags
    const matchesEventType =
      !selectedEventType ||
      (selectedEventType === 'food' && event.data.is_food) ||
      (selectedEventType === 'drinks' && event.data.is_drinks) ||
      (selectedEventType === 'music' && event.data.is_music) ||
      (selectedEventType === 'lecture' && event.data.is_lecture) ||
      (selectedEventType === 'crafting' && event.data.is_crafting) ||
      (selectedEventType === 'art' && event.data.is_art);

    return matchesDate && matchesLocation && matchesEventType;
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
      return <BackToComponent text="Aktuelle Events" url="/events" />;
    }
    return null;
  }, [pathname]);

  return (
    <div className={styles.container}>
      <MainHeading page={page} />
      <div className={styles.eventsContainer}>
        <div className={styles.backLinkContainer}>
          {backComponent}

          <div className={`${isFoldoutOpen && styles.foldoutOpen}`}>
            <FilterComponent
              events={events}
              isFoldoutOpen={isFoldoutOpen}
              setIsFoldoutOpen={setIsFoldoutOpen}
            />
          </div>
        </div>
        {filteredEvents &&
          filteredEvents
            .sort((a: any, b: any) => {
              return (
                new Date(a.data.event_start_date).getTime() -
                new Date(b.data.event_start_date).getTime()
              );
            })
            .map((event: any, index: number) => (
              <EventComponent key={index} event={event} />
            ))}
      </div>
    </div>
  );
}

function EventsContent({ page }: { page: any }) {
  const { events } = useEvents();

  return (
    <FilterProvider>
      <EventsContentInner page={page} events={events} />
    </FilterProvider>
  );
}

export default EventsContent;

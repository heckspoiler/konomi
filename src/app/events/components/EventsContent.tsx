'use client';

import React, { useEffect, useState } from 'react';
import styles from './EventsContent.module.css';
import MainHeading from './MainHeading';
import EventComponent from './EventComponent';
import BackToComponent from './BackToComponent';
import { usePathname } from 'next/navigation';
import FilterComponent from './FilterComponent';
import { FilterProvider, useFilter } from '../../../../contexts/FilterContext';
import { formatDate } from '../../../../helpers/formatDate';

function EventsContentInner({ events, page }: { events?: any; page: any }) {
  const pathname = usePathname();
  const [backComponent, setBackComponent] = useState<React.ReactNode>(null);
  const { selectedDate, selectedLocation, selectedEventType } = useFilter();
  const [isFoldoutOpen, setIsFoldoutOpen] = useState(false);
  // Filter events based on selected criteria
  const filteredEvents = events?.filter((event: any) => {
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
      (selectedEventType === 'crafting' && event.data.is_crafting);

    return matchesDate && matchesLocation && matchesEventType;
  });

  useEffect(() => {
    if (pathname && pathname.startsWith('/events')) {
      setBackComponent(
        <div className={styles.backToContainer}>
          <BackToComponent text="Zum Archiv" url="/archive" />
        </div>
      );
    } else if (pathname && pathname.startsWith('/archive')) {
      setBackComponent(
        <BackToComponent text="Aktuelle Events" url="/events" />
      );
    }
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

function EventsContent({ events, page }: { events?: any; page: any }) {
  return (
    <FilterProvider>
      <EventsContentInner events={events} page={page} />
    </FilterProvider>
  );
}

export default EventsContent;

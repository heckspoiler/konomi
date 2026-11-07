'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './EventsContent.module.css';
import MainHeading from './MainHeading';
import EventComponent from './EventComponent';
import BackToComponent from './BackToComponent';
import FilterComponent from './FilterComponent';
import { FilterProvider, useFilter } from '@contexts/FilterContext';
import { useNow } from '@contexts/NowContext';
import { formatDate } from '@helpers/formatDate';
import { EventSummary, isUpcoming } from '@helpers/events';
import { useInfiniteList } from '@helpers/useInfiniteList';
import { asText } from '@prismicio/client';
import {
  ArchiveDocument,
  EventsDocument,
  SearchIconDocument,
} from '@/prismicio-types';
import SearchContainer from './SearchContainer';
import { useSearchbarStore } from '@stores/useSearchStore';
import PageContainer from '@/app/components/PageContainer/PageContainer';
import SeeYouNextYear from '@/app/components/SeeYouNextYear/SeeYouNextYear';

export type EventsVariant = 'upcoming' | 'archive';

type EventsContentProps = {
  page: EventsDocument | ArchiveDocument;
  /** Already scoped to the variant and sorted by the server. */
  events: EventSummary[];
  /** For "Wir sehen uns im …" when nothing is upcoming. */
  nextYear: number;
  searchicon: SearchIconDocument;
  variant: EventsVariant;
};

const ARCHIVE_BATCH_SIZE = 20;

/** Strip diacritics so e.g. "ō" matches "o". */
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const EVENT_TYPE_FLAGS = {
  food: 'is_food',
  drinks: 'is_drinks',
  music: 'is_music',
  lecture: 'is_lecture',
  crafting: 'is_crafting',
  art: 'is_art',
} as const;

function EventsContentInner({
  page,
  events,
  nextYear,
  searchicon,
  variant,
}: EventsContentProps) {
  const { selectedDate, selectedLocation, selectedEventType } = useFilter();
  const { query } = useSearchbarStore();
  const [isFoldoutOpen, setIsFoldoutOpen] = useState(false);
  const foldoutRef = useRef<HTMLDivElement>(null);
  const now = useNow();

  // The server split events at render time; drop any that have ended since.
  const scopedEvents =
    variant === 'upcoming'
      ? events.filter((event) => isUpcoming(event, now))
      : events;

  useEffect(() => {
    if (!isFoldoutOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFoldoutOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        foldoutRef.current &&
        !foldoutRef.current.contains(e.target as Node)
      ) {
        setIsFoldoutOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFoldoutOpen]);

  const searchNorm = normalize(query);

  const filteredEvents = scopedEvents.filter((event) => {
    const matchesDate =
      !selectedDate || formatDate(event.data.event_start_date) === selectedDate;

    const matchesLocation =
      !selectedLocation ||
      asText(event.data.event_location) === selectedLocation;

    const matchesEventType =
      !selectedEventType ||
      event.data[
        EVENT_TYPE_FLAGS[selectedEventType as keyof typeof EVENT_TYPE_FLAGS]
      ];

    const matchesSearch =
      !query ||
      normalize(asText(event.data.event_title)).includes(searchNorm) ||
      normalize(asText(event.data.event_location)).includes(searchNorm);

    return matchesDate && matchesLocation && matchesEventType && matchesSearch;
  });

  const showSeeYou = variant === 'upcoming' && scopedEvents.length === 0;

  // The archive grows every year: render it in batches as you scroll.
  // The upcoming list is short, so it renders in full.
  const isArchive = variant === 'archive';
  const { visibleItems, hasMore, sentinelRef, saveState } = useInfiniteList(
    filteredEvents,
    {
      batchSize: isArchive ? ARCHIVE_BATCH_SIZE : Infinity,
      storageKey: isArchive ? 'archive-list' : undefined,
      resetKey: [selectedDate, selectedLocation, selectedEventType, query].join(
        '|',
      ),
    },
  );

  // Remember the list position when opening an event, so "back" returns here.
  const handleListClick = (e: React.MouseEvent) => {
    if ((e.target as Element).closest('a[href^="/events/"]')) saveState();
  };

  return (
    <PageContainer>
      <MainHeading page={page} />
      <div className={styles.eventsContainer}>
        <div className={styles.filtercontainer}>
          <div className={styles.backLinkContainer}>
            {variant === 'upcoming' ? (
              <div className={styles.backToContainer}>
                <BackToComponent text="Archiv" url="/archive" />
              </div>
            ) : (
              <BackToComponent text="Events" url="/events" />
            )}
          </div>
          <div className={styles.searchbar}>
            <SearchContainer searchicon={searchicon} />
          </div>
          <div
            ref={foldoutRef}
            className={`${styles.filterbutton} ${isFoldoutOpen ? styles.foldoutOpen : ''}`}
          >
            <FilterComponent
              events={scopedEvents}
              variant={variant}
              isFoldoutOpen={isFoldoutOpen}
              setIsFoldoutOpen={setIsFoldoutOpen}
            />
          </div>
        </div>
        {showSeeYou ? (
          <SeeYouNextYear year={nextYear} as="h1" />
        ) : (
          <div className={styles.list} onClick={handleListClick}>
            {visibleItems.map((event) => (
              <EventComponent
                key={event.id}
                event={event}
                showDate={!isArchive}
              />
            ))}
            {hasMore && (
              <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default function EventsContent(props: EventsContentProps) {
  return (
    <FilterProvider>
      <EventsContentInner {...props} />
    </FilterProvider>
  );
}

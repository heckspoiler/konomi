import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { formatDate } from '@helpers/formatDate';
import { useFilter } from '@contexts/FilterContext';
import { useMobile } from '@contexts/MobileContext';
import { EventDocument } from '@/prismicio-types';

/** `events` arrive already scoped and sorted by start date. */
export default function DateFilter({ events }: { events: EventDocument[] }) {
  const { selectedDate, setSelectedDate } = useFilter();
  const { isDesktop } = useMobile();

  const dates = [
    ...new Set(events.map((event) => formatDate(event.data.event_start_date))),
  ].filter(Boolean);

  return (
    <FiltermappingContainer>
      {dates.map((date) => {
        const isSelected = selectedDate === date;
        return (
          <div
            key={date}
            className={`${styles.eventType} ${
              isSelected && isDesktop ? styles.selected : ''
            }`}
            onClick={() => setSelectedDate(isSelected ? '' : date)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                setSelectedDate(isSelected ? '' : date);
            }}
            role="button"
            tabIndex={0}
          >
            <p>{date}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { useFilter } from '@contexts/FilterContext';
import { EventDocument } from '@/prismicio-types';
import { asText } from '@prismicio/client';

/** `events` arrive already scoped to the current view (upcoming or archive). */
export default function Location({ events }: { events: EventDocument[] }) {
  const { selectedLocation, setSelectedLocation } = useFilter();

  const locations = [
    ...new Set(events.map((event) => asText(event.data.event_location))),
  ]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }));

  return (
    <FiltermappingContainer>
      {locations.map((location) => {
        const isSelected = selectedLocation === location;
        return (
          <div
            key={location}
            className={`${styles.eventType} ${isSelected ? styles.selected : ''}`}
            onClick={() => setSelectedLocation(isSelected ? '' : location)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                setSelectedLocation(isSelected ? '' : location);
            }}
            role="button"
            tabIndex={0}
          >
            <p>{location}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

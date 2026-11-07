import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { useFilter } from '@contexts/FilterContext';
import { EventSummary } from '@helpers/events';
import { asText } from '@prismicio/client';

/** `events` arrive already scoped to the current view (upcoming or archive). */
export default function Location({ events }: { events: EventSummary[] }) {
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
          <button
            type="button"
            key={location}
            className={`unstyled-button ${styles.eventType} ${isSelected ? styles.selected : ''}`}
            onClick={() => setSelectedLocation(isSelected ? '' : location)}
            aria-pressed={isSelected}
          >
            <p>{location}</p>
          </button>
        );
      })}
    </FiltermappingContainer>
  );
}

import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { useFilter } from '../../../../../contexts/FilterContext';

export default function Location({ events }: { events: any }) {
  const { selectedLocation, setSelectedLocation } = useFilter();

  const eventsSorted = events
    .map((event: any) => {
      return event.data.event_location[0].text;
    })
    .filter(
      (location: string, index: number, self: string[]) =>
        self.indexOf(location) === index
    )
    .sort((a: string, b: string) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    );

  return (
    <FiltermappingContainer>
      {eventsSorted.map((location: string, index: number) => {
        const isSelected = selectedLocation === location;
        return (
          <div
            key={index}
            className={`${styles.eventType} ${isSelected ? styles.selected : ''}`}
            onClick={() => setSelectedLocation(isSelected ? '' : location)}
          >
            <p>{location}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

import React, { useState, useEffect } from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { useFilter } from '../../../../../contexts/FilterContext';
import { usePathname } from 'next/navigation';

export default function Location({ events }: { events: any }) {
  const { selectedLocation, setSelectedLocation } = useFilter();
  const [archivedLocations, setArchivedLocations] = useState<string[]>([]);
  const [upcomingLocations, setUpcomingLocations] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Filter archived events
    const archived = events
      .filter((event: any) => {
        const eventDate = new Date(event.data.event_start_date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < currentDate;
      })
      .map((event: any) => event.data.event_location[0].text)
      .filter(
        (location: string, index: number, self: string[]) =>
          self.indexOf(location) === index
      )
      .sort((a: string, b: string) =>
        a.localeCompare(b, 'en', { sensitivity: 'base' })
      );

    // Filter upcoming events
    const upcoming = events
      .filter((event: any) => {
        const eventDate = new Date(event.data.event_start_date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= currentDate;
      })
      .map((event: any) => event.data.event_location[0].text)
      .filter(
        (location: string, index: number, self: string[]) =>
          self.indexOf(location) === index
      )
      .sort((a: string, b: string) =>
        a.localeCompare(b, 'en', { sensitivity: 'base' })
      );

    setArchivedLocations(archived);
    setUpcomingLocations(upcoming);
  }, [events]);

  const locationsToShow =
    pathname === '/archived' ? archivedLocations : upcomingLocations;

  console.log(events);

  return (
    <FiltermappingContainer>
      {locationsToShow.map((location: string, index: number) => {
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

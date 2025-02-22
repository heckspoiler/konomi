import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { formatDate } from '../../../../../helpers/formatDate';
import { useFilter } from '../../../../../contexts/FilterContext';
import { useMobile } from '../../../../../contexts/MobileContext';
import { usePathname } from 'next/navigation';

export default function DateFilter({ events }: { events: any }) {
  const { selectedDate, setSelectedDate } = useFilter();
  const pathname = usePathname();
  const { isMobile, isTablet, isDesktop } = useMobile();

  // Get current date at midnight for accurate comparison
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Filter and sort dates based on pathname
  const datesSorted = events
    .filter((event: any) => {
      const eventDate = new Date(event.data.event_start_date);
      eventDate.setHours(0, 0, 0, 0);

      if (pathname === '/events') {
        return eventDate >= currentDate;
      } else if (pathname === '/archived') {
        return eventDate < currentDate;
      }
      return true;
    })
    .map((event: any) => formatDate(event.data.event_start_date))
    .filter(
      (date: string, index: number, self: string[]) =>
        self.indexOf(date) === index
    )
    .sort((a: string, b: string) => {
      if (pathname === '/archived') {
        return b.localeCompare(a, 'en', { sensitivity: 'base' });
      }

      return a.localeCompare(b, 'en', { sensitivity: 'base' });
    });

  const handleInteraction = (
    e: React.TouchEvent | React.MouseEvent,
    date: string
  ) => {
    setSelectedDate(selectedDate === date ? '' : date);
  };

  return (
    <FiltermappingContainer>
      {datesSorted.map((date: string, index: number) => {
        const isSelected = selectedDate === date;
        return (
          <div
            key={index}
            className={`${styles.eventType} ${
              isSelected && isDesktop ? styles.selected : ''
            }`}
            onClick={() => setSelectedDate(isSelected ? '' : date)}
          >
            <p>{date}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

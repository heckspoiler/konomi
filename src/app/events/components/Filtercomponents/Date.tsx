import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { formatDate } from '../../../../../helpers/formatDate';
import { useFilter } from '../../../../../contexts/FilterContext';

import { useMobile } from '../../../../../contexts/MobileContext';

export default function DateFilter({ events }: { events: any }) {
  const { selectedDate, setSelectedDate } = useFilter();

  const { isMobile, isTablet, isDesktop } = useMobile();

  const datesSorted = events
    .map((event: any) => formatDate(event.data.event_start_date))
    .filter(
      (date: string, index: number, self: string[]) =>
        self.indexOf(date) === index
    )
    .sort((a: string, b: string) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    );

  const handleInteraction = (
    e: React.TouchEvent | React.MouseEvent,
    date: string
  ) => {
    e.preventDefault(); // Prevent any default behavior
    setSelectedDate(selectedDate === date ? '' : date);
  };

  return (
    <FiltermappingContainer>
      {datesSorted.map((date: string, index: number) => {
        const isSelected = selectedDate === date;
        return (
          <div
            key={index}
            className={`${styles.eventType} ${isSelected && isDesktop ? styles.selected : ''}`}
            onClick={() => isDesktop && setSelectedDate(isSelected ? '' : date)}
            onTouchEnd={(e) =>
              isMobile && isTablet && handleInteraction(e, date)
            }
          >
            <p>{date}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

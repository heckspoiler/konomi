import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { formatDate } from '../../../../../helpers/formatDate';
import { useFilter } from '../../../../../contexts/FilterContext';

export default function DateFilter({ events }: { events: any }) {
  const { selectedDate, setSelectedDate } = useFilter();

  const datesSorted = events
    .map((event: any) => formatDate(event.data.event_start_date))
    .filter(
      (date: string, index: number, self: string[]) =>
        self.indexOf(date) === index
    )
    .sort((a: string, b: string) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    );

  return (
    <FiltermappingContainer>
      {datesSorted.map((date: string, index: number) => {
        const isSelected = selectedDate === date;
        return (
          <div
            key={index}
            className={`${styles.eventType} ${isSelected ? styles.selected : ''}`}
            onClick={() => setSelectedDate(isSelected ? '' : date)}
          >
            <p>{date}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

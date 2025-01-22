import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import { formatDate } from '../../../../../helpers/formatDate';

export default function Location({ events }: { events: any }) {
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
        return (
          <div key={index} className={styles.eventType}>
            <p>{date}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

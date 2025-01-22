import React from 'react';

import styles from './LowerContent.module.css';

import FiltermappingContainer from './FiltermappingContainer';

export default function Location({ events }: { events: any }) {
  const eventsSorted = events
    .map((event: any) => {
      return event.data.event_location[0].text;
    })
    .filter(
      (date: string, index: number, self: string[]) =>
        self.indexOf(date) === index
    )
    .sort((a: string, b: string) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    );

  return (
    <FiltermappingContainer>
      {eventsSorted.map((event: any, index: number) => {
        return (
          <div key={index} className={styles.eventType}>
            <p>{event}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

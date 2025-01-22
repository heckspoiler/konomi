import React from 'react';

import styles from './LowerContent.module.css';

import EventtypeArray from './EventtypeArray';
import FiltermappingContainer from './FiltermappingContainer';

export default function Location({ events }: { events: any }) {
  return (
    <FiltermappingContainer>
      {events.map((event: any, index: number) => {
        return (
          <div key={index} className={styles.eventType}>
            <p>{event.data.event_location[0].text}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

'use client';

import React from 'react';

import styles from './EventType.module.css';

import EventtypeArray from './EventtypeArray';
import FiltermappingContainer from './FiltermappingContainer';

export default function EventType() {
  return (
    <FiltermappingContainer>
      {EventtypeArray.map((event: any, index: number) => {
        return (
          <div key={index} className={styles.eventType}>
            <p>{event}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

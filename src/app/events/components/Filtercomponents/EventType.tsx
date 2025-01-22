'use client';

import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import EventtypeArray from './EventtypeArray';
import { useFilter } from '../../../../../contexts/FilterContext';

type EventType = {
  name: string;
  value: string;
};

export default function EventType() {
  const { selectedEventType, setSelectedEventType } = useFilter();

  return (
    <FiltermappingContainer>
      {EventtypeArray.map((eventType: EventType, index: number) => {
        const isSelected = selectedEventType === eventType.value;
        return (
          <div
            key={index}
            className={`${styles.eventType} ${isSelected ? styles.selected : ''}`}
            onClick={() =>
              setSelectedEventType(isSelected ? '' : eventType.value)
            }
          >
            <p>{eventType.name}</p>
          </div>
        );
      })}
    </FiltermappingContainer>
  );
}

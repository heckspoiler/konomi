'use client';

import React from 'react';
import styles from './LowerContent.module.css';
import FiltermappingContainer from './FiltermappingContainer';
import EventtypeArray from './EventtypeArray';
import { useFilter } from '@contexts/FilterContext';

type EventType = {
  name: string;
  value: string;
};

export default function EventType() {
  const { selectedEventType, setSelectedEventType } = useFilter();

  return (
    <FiltermappingContainer>
      {EventtypeArray.map((eventType: EventType) => {
        const isSelected = selectedEventType === eventType.value;
        return (
          <button
            type="button"
            key={eventType.value}
            className={`unstyled-button ${styles.eventType} ${isSelected ? styles.selected : ''}`}
            onClick={() =>
              setSelectedEventType(isSelected ? '' : eventType.value)
            }
            aria-pressed={isSelected}
          >
            <p>{eventType.name}</p>
          </button>
        );
      })}
    </FiltermappingContainer>
  );
}

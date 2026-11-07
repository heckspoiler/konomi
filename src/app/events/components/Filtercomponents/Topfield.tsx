'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from './Topfield.module.css';
import { useFilter } from '@contexts/FilterContext';
import type { EventsVariant } from '../EventsContent';

export default function Topfield({
  variant,
  fieldIsOpen,
  setIsFieldOpen,
}: {
  variant: EventsVariant;
  fieldIsOpen: string;
  setIsFieldOpen: Dispatch<SetStateAction<string>>;
}) {
  const { selectedEventType, selectedDate, selectedLocation } = useFilter();
  const handleClick = (key: string) => {
    setIsFieldOpen(fieldIsOpen === key ? '' : key);
  };

  return (
    <div
      className={`${variant === 'archive' ? styles.containerArchived : styles.container}`}
    >
      <div
        key="event"
        onClick={() => handleClick('event')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick('event'); }}
        role="button"
        tabIndex={0}
        className={`${styles.category} ${fieldIsOpen === 'event' ? styles.open : ''} ${
          selectedEventType ? styles.hasFilter : ''
        }`}
      >
        <div
          className={`${styles.indicator} ${selectedEventType && styles.indicatorVisible}`}
        ></div>{' '}
        <h5>Eventart</h5>
      </div>
      {variant === 'archive' ? null : (
        <div
          key="date"
          onClick={() => handleClick('date')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick('date'); }}
          role="button"
          tabIndex={0}
          className={`${styles.category} ${fieldIsOpen === 'date' ? styles.open : ''} ${
            selectedDate ? styles.hasFilter : ''
          }`}
        >
          <div
            className={`${styles.indicator} ${selectedDate && styles.indicatorVisible}`}
          ></div>
          <h5>Datum</h5>
        </div>
      )}
      <div
        key="location"
        onClick={() => handleClick('location')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick('location'); }}
        role="button"
        tabIndex={0}
        className={`${styles.category} ${fieldIsOpen === 'location' ? styles.open : ''} ${
          selectedLocation ? styles.hasFilter : ''
        }`}
      >
        <div
          className={`${styles.indicator} ${selectedLocation && styles.indicatorVisible}`}
        ></div>
        <h5>Location</h5>
      </div>
    </div>
  );
}

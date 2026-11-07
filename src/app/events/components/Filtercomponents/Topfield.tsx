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

  const tabs = [
    { key: 'event', label: 'Eventart', hasFilter: !!selectedEventType },
    // Archived events are browsed by type and location only.
    ...(variant === 'archive'
      ? []
      : [{ key: 'date', label: 'Datum', hasFilter: !!selectedDate }]),
    { key: 'location', label: 'Location', hasFilter: !!selectedLocation },
  ];

  return (
    <div
      className={
        variant === 'archive' ? styles.containerArchived : styles.container
      }
    >
      {tabs.map(({ key, label, hasFilter }) => (
        <button
          type="button"
          key={key}
          onClick={() => setIsFieldOpen(fieldIsOpen === key ? '' : key)}
          aria-expanded={fieldIsOpen === key}
          className={`unstyled-button ${styles.category} ${fieldIsOpen === key ? styles.open : ''} ${
            hasFilter ? styles.hasFilter : ''
          }`}
        >
          <span
            className={`${styles.indicator} ${hasFilter ? styles.indicatorVisible : ''}`}
            aria-hidden="true"
          ></span>
          <h5>{label}</h5>
        </button>
      ))}
    </div>
  );
}

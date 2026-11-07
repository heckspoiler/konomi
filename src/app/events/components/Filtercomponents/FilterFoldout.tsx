'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';

import styles from './FilterFoldout.module.css';

import Topfield from './Topfield';
import Bottomfield from './Bottomfield';
import { useFilter } from '@contexts/FilterContext';
import { EventSummary } from '@helpers/events';
import type { EventsVariant } from '../EventsContent';

export default function FilterFoldout({
  events,
  variant,
  isFoldoutOpen,
  setIsFoldoutOpen,
}: {
  events: EventSummary[];
  variant: EventsVariant;
  isFoldoutOpen: boolean;
  setIsFoldoutOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [fieldIsOpen, setIsFieldOpen] = useState('event');

  const {
    selectedDate,
    selectedLocation,
    selectedEventType,
    setSelectedDate,
    setSelectedLocation,
    setSelectedEventType,
  } = useFilter();

  const hasActiveFilters =
    selectedDate || selectedLocation || selectedEventType;

  // Reset all filters
  const resetFilters = () => {
    setSelectedDate('');
    setSelectedLocation('');
    setSelectedEventType('');
    setIsFoldoutOpen(false);
  };
  return (
    <div className={styles.foldout}>
      <Topfield
        variant={variant}
        fieldIsOpen={fieldIsOpen}
        setIsFieldOpen={setIsFieldOpen}
      />
      <Bottomfield events={events} fieldIsOpen={fieldIsOpen} />
      <button onClick={resetFilters} className={styles.resetButton}>
        <span>
          {isFoldoutOpen && hasActiveFilters
            ? 'Filter zurücksetzen & Schliessen'
            : 'Schliessen'}
        </span>
      </button>
    </div>
  );
}

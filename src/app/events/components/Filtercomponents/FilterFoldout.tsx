'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';

import styles from './FilterFoldout.module.css';

import Topfield from './Topfield';
import Bottomfield from './Bottomfield';
import { useFilter } from '../../../../../contexts/FilterContext';
import { EventDocument } from '../../../../../prismicio-types';

export default function FilterFoldout({
  events,
  isFoldoutOpen,
  setIsFoldoutOpen,
}: {
  events: EventDocument[];
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

  // Check if any filter is active
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
      <Topfield fieldIsOpen={fieldIsOpen} setIsFieldOpen={setIsFieldOpen} />
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

'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from './FilterComponent.module.css';
import FilterFoldout from './Filtercomponents/FilterFoldout';

import { useFilter } from '@contexts/FilterContext';
import { EventDocument } from '@/prismicio-types';
import type { EventsVariant } from './EventsContent';

export default function FilterComponent({
  events,
  variant,
  setIsFoldoutOpen,
  isFoldoutOpen,
}: {
  events: EventDocument[];
  variant: EventsVariant;
  isFoldoutOpen: boolean;
  setIsFoldoutOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { selectedDate, selectedLocation, selectedEventType } = useFilter();

  const hasActiveFilters =
    selectedDate || selectedLocation || selectedEventType;

  return (
    <div className={styles.filterContainer}>
      <div
        className={`${styles.indicator} ${hasActiveFilters && !isFoldoutOpen ? styles.indicatorVisible : ''}`}
        aria-hidden="true"
      ></div>
      <div className={styles.filterHeader}>
        <button
          type="button"
          className={`unstyled-button ${styles.filterItem} ${isFoldoutOpen ? styles.open : ''}`}
          onClick={() => setIsFoldoutOpen(!isFoldoutOpen)}
          aria-expanded={isFoldoutOpen}
        >
          <p>{!isFoldoutOpen ? 'Filter' : 'Schliessen'}</p>
        </button>
      </div>
      <div
        className={`${styles.foldoutContainer} ${isFoldoutOpen ? styles.open : ''}`}
      >
        <FilterFoldout
          events={events}
          variant={variant}
          isFoldoutOpen={isFoldoutOpen}
          setIsFoldoutOpen={setIsFoldoutOpen}
        />
      </div>
    </div>
  );
}

'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from './FilterComponent.module.css';
import FilterFoldout from './Filtercomponents/FilterFoldout';

import { useFilter } from '@contexts/FilterContext';
import { EventDocument } from '@/prismicio-types';

export default function FilterComponent({
  events,
  setIsFoldoutOpen,
  isFoldoutOpen,
}: {
  events: EventDocument[];
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
      ></div>
      <div className={styles.filterHeader}>
        <div
          className={`${styles.filterItem} ${isFoldoutOpen ? styles.open : ''}`}
          onClick={() => setIsFoldoutOpen(!isFoldoutOpen)}
        >
          <p>{!isFoldoutOpen ? 'Filter' : 'Schliessen'}</p>
        </div>
      </div>
      <div
        className={`${styles.foldoutContainer} ${isFoldoutOpen ? styles.open : ''}`}
      >
        <FilterFoldout
          events={events}
          isFoldoutOpen={isFoldoutOpen}
          setIsFoldoutOpen={setIsFoldoutOpen}
        />
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import styles from './FilterComponent.module.css';
import FilterFoldout from './Filtercomponents/FilterFoldout';

export default function FilterComponent({
  events,
  setIsFoldoutOpen,
  isFoldoutOpen,
}: {
  events: any;
  isFoldoutOpen: any;
  setIsFoldoutOpen: any;
}) {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <div
          className={`${styles.filterItem} ${isFoldoutOpen ? styles.open : ''}`}
          onClick={() => setIsFoldoutOpen(!isFoldoutOpen)}
        >
          <p>Filter</p>
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

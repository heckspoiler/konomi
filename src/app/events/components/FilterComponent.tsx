'use client';

import React, { useState } from 'react';
import styles from './FilterComponent.module.css';
import FilterFoldout from './Filtercomponents/FilterFoldout';

export default function FilterComponent({ events }: { events: any }) {
  const [isFoldoutOpen, setIsFoldoutOpen] = useState(true);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <div
          className={styles.filterItem}
          onClick={() => setIsFoldoutOpen(!isFoldoutOpen)}
        >
          <p>Filter</p>
        </div>
      </div>
      <div
        className={`${styles.foldoutContainer} ${isFoldoutOpen ? styles.open : ''}`}
      >
        <FilterFoldout events={events} />
      </div>
    </div>
  );
}

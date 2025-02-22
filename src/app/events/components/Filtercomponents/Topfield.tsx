'use client';

import React from 'react';
import styles from './Topfield.module.css';
import { useFilter } from '../../../../../contexts/FilterContext';
import { usePathname } from 'next/navigation';

export default function Topfield({
  fieldIsOpen,
  setIsFieldOpen,
}: {
  fieldIsOpen: string;
  setIsFieldOpen: any;
}) {
  const { selectedEventType, selectedDate, selectedLocation } = useFilter();
  const pathname = usePathname();
  const handleClick = (key: string) => {
    setIsFieldOpen(fieldIsOpen === key ? '' : key);
  };

  return (
    <div
      className={`${pathname === '/archive' ? styles.containerArchived : styles.container}`}
    >
      <div
        key="event"
        onClick={() => handleClick('event')}
        className={`${styles.category} ${fieldIsOpen === 'event' ? styles.open : ''} ${
          selectedEventType ? styles.hasFilter : ''
        }`}
      >
        <div
          className={`${styles.indicator} ${selectedEventType && styles.indicatorVisible}`}
        ></div>{' '}
        <h5>Eventart</h5>
      </div>
      {pathname === '/archive' ? null : (
        <div
          key="date"
          onClick={() => handleClick('date')}
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

import React from 'react';
import styles from './Topfield.module.css';
import { useFilter } from '../../../../../contexts/FilterContext';

export default function Topfield({
  fieldIsOpen,
  setIsFieldOpen,
}: {
  fieldIsOpen: string;
  setIsFieldOpen: any;
}) {
  const { selectedEventType, selectedDate, selectedLocation } = useFilter();

  const handleClick = (key: string) => {
    setIsFieldOpen(fieldIsOpen === key ? '' : key);
  };

  return (
    <div className={styles.container}>
      <div
        key="event"
        onClick={() => handleClick('event')}
        className={`${fieldIsOpen === 'event' ? styles.open : ''} ${
          selectedEventType ? styles.hasFilter : ''
        }`}
      >
        <h5>Eventart</h5>
      </div>
      <div
        key="date"
        onClick={() => handleClick('date')}
        className={`${fieldIsOpen === 'date' ? styles.open : ''} ${
          selectedDate ? styles.hasFilter : ''
        }`}
      >
        <h5>Datum</h5>
      </div>
      <div
        key="location"
        onClick={() => handleClick('location')}
        className={`${fieldIsOpen === 'location' ? styles.open : ''} ${
          selectedLocation ? styles.hasFilter : ''
        }`}
      >
        <h5>Location</h5>
      </div>
    </div>
  );
}

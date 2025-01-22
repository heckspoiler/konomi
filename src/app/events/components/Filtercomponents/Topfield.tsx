import React from 'react';
import styles from './Topfield.module.css';

export default function Topfield({
  fieldIsOpen,
  setIsFieldOpen,
}: {
  fieldIsOpen: string;
  setIsFieldOpen: any;
}) {
  const handleClick = (key: string) => {
    setIsFieldOpen(fieldIsOpen === key ? '' : key);
  };

  return (
    <div className={styles.container}>
      <div
        key="event"
        onClick={() => handleClick('event')}
        className={`${fieldIsOpen === 'event' ? styles.open : ''}`}
      >
        <h5>Eventart</h5>
      </div>
      <div
        key="date"
        onClick={() => handleClick('date')}
        className={`${fieldIsOpen === 'date' ? styles.open : ''}`}
      >
        <h5>Datum</h5>
      </div>
      <div
        key="location"
        onClick={() => handleClick('location')}
        className={`${fieldIsOpen === 'location' ? styles.open : ''}`}
      >
        <h5>Location</h5>
      </div>
    </div>
  );
}

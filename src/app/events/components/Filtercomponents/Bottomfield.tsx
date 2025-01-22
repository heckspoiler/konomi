import React from 'react';

import styles from './Bottomfield.module.css';
import EventType from './EventType';

export default function Bottomfield({ events }: { events: any }) {
  return (
    <div className={styles.container}>
      <EventType />
    </div>
  );
}

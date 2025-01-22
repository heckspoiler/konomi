import React from 'react';

import styles from './FilterFoldout.module.css';

import Topfield from './Topfield';
import Bottomfield from './Bottomfield';

export default function FilterFoldout({ events }: { events: any }) {
  return (
    <div className={styles.foldout}>
      <Topfield />
      <Bottomfield events={events} />
    </div>
  );
}

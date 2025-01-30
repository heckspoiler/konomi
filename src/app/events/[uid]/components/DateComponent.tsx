import React from 'react';

import { formatDateTime } from '../../../../../helpers/formateDateTime';

import styles from './DateComponent.module.css';
import CalendarIcon from './CalendarIcon';

export default function DateComponent({ data }: { data: any }) {
  const startDateTime = formatDateTime(data.event_start_date);
  const endDateTime = formatDateTime(data.event_end_date);
  return (
    <div className={styles.dateContainer}>
      <CalendarIcon />
      <div className={styles.textContainer}>
        <p>
          <span>{startDateTime.dayOnly}</span> -
          <span>{endDateTime.dayOnly}</span>
        </p>
        <p>
          {startDateTime.timeOnly} - {endDateTime.timeOnly}
        </p>
      </div>
    </div>
  );
}

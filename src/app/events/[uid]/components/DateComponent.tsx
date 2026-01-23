import React from 'react';

import { formatDateTime } from '../../../../../helpers/formateDateTime';

import styles from './DateComponent.module.css';
import CalendarIcon from './CalendarIcon';
import { EventDocumentData, Simplify } from '../../../../../prismicio-types';

export default function DateComponent({
  data,
}: {
  data: Simplify<EventDocumentData>;
}) {
  const startDateTime = formatDateTime(data.event_start_date);
  const endDateTime = formatDateTime(data.event_end_date);
  return (
    <div className={styles.dateContainer}>
      <CalendarIcon />
      <div className={styles.textContainer}>
        <p>
          <span>
            {startDateTime.dayOnly}
            {endDateTime.dayOnly !== startDateTime.dayOnly && ' - '}
            {endDateTime.dayOnly !== startDateTime.dayOnly &&
              endDateTime.dayOnly}{' '}
          </span>
        </p>
        <p>
          {startDateTime.timeOnly}
          {endDateTime && ' - '}
          {endDateTime && endDateTime.timeOnly}
        </p>
      </div>
    </div>
  );
}

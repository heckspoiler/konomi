import React from 'react';

import { formatDateTime } from '../../../../../helpers/formateDateTime';

import styles from './DateComponent.module.css';

import { PrismicNextImage } from '@prismicio/next';

export default function DateComponent({ data }: { data: any }) {
  const startDateTime = formatDateTime(data.event_start_date);
  const endDateTime = formatDateTime(data.event_end_date);
  return (
    <div className={styles.dateContainer}>
      <div>
        <PrismicNextImage field={data.date_icon} />
      </div>
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

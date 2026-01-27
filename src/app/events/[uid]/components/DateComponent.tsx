import React from 'react';

import { formatDateTime } from '../../../../../helpers/formateDateTime';

import styles from './DateComponent.module.css';
import CalendarIcon from './CalendarIcon';
import {
  EventDocumentData,
  NewsarticleDocument,
  Simplify,
} from '../../../../../prismicio-types';

type EventProps = {
  variant: 'event';
  data: Simplify<EventDocumentData>;
};

type NewsProps = {
  variant: 'news';
  document: NewsarticleDocument;
};

type DateComponentProps = EventProps | NewsProps;

export default function DateComponent(props: DateComponentProps) {
  if (props.variant === 'news') {
    const publishingDate = formatDateTime(
      props.document.first_publication_date,
    );
    return (
      <div className={styles.dateContainer}>
        <CalendarIcon />
        <div className={styles.textContainer}>
          <p>
            <span>{publishingDate.dayMonthYear}</span>
          </p>
        </div>
      </div>
    );
  }

  const startDateTime = formatDateTime(props.data.event_start_date);
  const endDateTime = formatDateTime(props.data.event_end_date);

  const isSameDay = startDateTime.dayMonthYear === endDateTime.dayMonthYear;

  return (
    <div className={styles.dateContainer}>
      <CalendarIcon />
      <div className={styles.textContainer}>
        <p>
          <span>
            {isSameDay ? (
              startDateTime.dayMonthYear
            ) : (
              <>
                {startDateTime.dayOnly} - {endDateTime.dayMonthYear}
              </>
            )}
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

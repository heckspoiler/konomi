import React from 'react';

import MainHeading from '../../components/MainHeading';

import styles from './EventContent.module.css';

import { PrismicRichText } from '@prismicio/react';

import { PrismicNextImage } from '@prismicio/next';

import EventImage from './EventImage';

import { formatDateTime } from '../../../../../helpers/formateDateTime';

export default function EventContent({
  page,
  events,
}: {
  page: any;
  events: any;
}) {
  const data = page.data;

  const startDateTime = formatDateTime(data.event_start_date);
  const endDateTime = formatDateTime(data.event_end_date);
  return (
    <div className={styles.container}>
      <MainHeading title={'Event'} page={events} />
      <div className={styles.eventContainer}>
        <div className={styles.titleContainer}>
          <PrismicRichText field={data.event_title} />{' '}
        </div>
        <div className={styles.locationContainer}>
          <PrismicNextImage field={data.location_icon} />
          <PrismicRichText field={data.event_location} />
          <PrismicRichText field={data.event_street} />
          <PrismicRichText field={data.event_postcode_and_city} />
        </div>
        <div className={styles.dateContainer}>
          <PrismicNextImage field={data.date_icon} />
          {startDateTime.dayOnly} {startDateTime.timeOnly} -{' '}
          {endDateTime.timeOnly}
        </div>
        <EventImage image={data.event_image} />
        <p>{data.event_description}</p>
      </div>
    </div>
  );
}

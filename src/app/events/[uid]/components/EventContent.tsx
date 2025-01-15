import React from 'react';

import MainHeading from '../../components/MainHeading';

import styles from './EventContent.module.css';

import { PrismicRichText } from '@prismicio/react';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import EventImage from './EventImage';

import IconComponent from '../../components/IconComponent';

import LocationComponent from './LocationComponent';
import DateComponent from './DateComponent';

export default function EventContent({
  page,
  events,
}: {
  page: any;
  events: any;
}) {
  const data = page.data;

  return (
    <div className={styles.container}>
      <MainHeading title={'Event'} page={events} />
      <div className={styles.eventContainer}>
        <div className={styles.titleContainer}>
          <PrismicRichText field={data.event_title} />
        </div>
        <div className={styles.infoContainer}>
          <LocationComponent data={data} />
          <DateComponent data={data} />
          <div className={styles.linkContainer}>
            <PrismicNextLink field={data.eventfrog_link} />
          </div>
        </div>
        <EventImage image={data.event_image} /> <IconComponent event={page} />
        <div className={styles.descriptionContainer}>
          <p>{data.event_description}</p>
        </div>
      </div>
    </div>
  );
}

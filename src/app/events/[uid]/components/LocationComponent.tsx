import React from 'react';

import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

import styles from './LocationComponent.module.css';
export default function LocationComponent({ data }: { data: any }) {
  return (
    <div className={styles.locationContainer}>
      <div className={styles.iconContainer}>
        <PrismicNextImage field={data.location_icon} />
      </div>
      <div className={styles.textContainer}>
        <PrismicRichText field={data.event_location} />
        <PrismicRichText field={data.event_street} />
        <PrismicRichText field={data.event_postcode_and_city} />
      </div>
    </div>
  );
}

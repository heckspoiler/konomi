import React from 'react';

import { PrismicRichText } from '@prismicio/react';
import LocationIcon from './LocationIcon';

import styles from './LocationComponent.module.css';

export default function LocationComponent({ data }: { data: any }) {
  return (
    <div className={styles.locationContainer}>
      <LocationIcon />
      <div className={styles.textContainer}>
        <PrismicRichText field={data.event_location} />
        <PrismicRichText field={data.event_street} />
        <PrismicRichText field={data.event_postcode_and_city} />
      </div>
    </div>
  );
}

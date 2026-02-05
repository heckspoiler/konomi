import React from 'react';

import { PrismicRichText } from '@prismicio/react';
import LocationIcon from './LocationIcon';

import styles from './LocationComponent.module.css';
import { EventDocumentData, Simplify } from '@/prismicio-types';

export default function LocationComponent({
  data,
}: {
  data: Simplify<EventDocumentData>;
}) {
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

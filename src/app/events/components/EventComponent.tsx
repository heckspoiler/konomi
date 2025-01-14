import React from 'react';
import styles from './EventComponent.module.css';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

interface EventProps {
  event: {
    data: {
      event_title: any;
      event_street: any;
      event_start_date: string;
      event_end_date: string;
      event_image: any;
      event_description: string;
    };
  };
}

export default function EventComponent({ event }: EventProps) {
  return (
    <div className={styles.event}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <PrismicRichText field={event.data.event_title} />
        <PrismicRichText field={event.data.event_street} />
        <p>{event.data.event_start_date}</p>
        <p>{event.data.event_end_date}</p>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './EventComponent.module.css';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { truncateText } from '../../../../helpers/truncateText';
import { formatDateTime } from '../../../../helpers/formateDateTime';
import LeftContainer from './LeftContainer';

import { useMobile } from '../../../../contexts/MobileContext';

import LocationIcon from '../[uid]/components/LocationIcon';
import CalendarIcon from '../[uid]/components/CalendarIcon';

interface EventProps {
  event: {
    uid: string;
    url: string;
    data: {
      event_title: any;
      event_street: any;
      event_start_date: string;
      event_end_date: string;
      event_image: any;
      event_description: string;
      event_location: any;
      event_link: any;
      event_postcode_and_city: any;
      google_location_link: any;
      location_icon: any;
      date_icon: any;
    };
  };
}

export default function EventComponent({ event }: EventProps) {
  const startDateTime = formatDateTime(event.data.event_start_date);
  const endDateTime = formatDateTime(event.data.event_end_date);

  const { isMobile } = useMobile();
  return (
    <div className={styles.event}>
      <PrismicRichText field={event.data.event_title} />
      <div className={styles.middleContainer}>
        <PrismicNextLink field={event.data.google_location_link}>
          <div className={styles.addressContainer}>
            <LocationIcon />
            <div>
              <h5>
                {truncateText(
                  event.data.event_location[0].text,
                  isMobile ? 25 : 100
                )}
              </h5>
              <PrismicRichText field={event.data.event_street} />
              <PrismicRichText field={event.data.event_postcode_and_city} />
            </div>
          </div>{' '}
        </PrismicNextLink>
        <div className={styles.lowerRightContainer}>
          <div className={styles.dateContainer}>
            <div className={styles.iconContainer}>
              <CalendarIcon />
            </div>
            <div>
              <span className={styles.dayDate}>
                <p className={styles.date}>{startDateTime.dayOnly} </p>
                <p className={styles.date}> - {startDateTime.dayOnly}</p>
              </span>

              <p className={styles.time}>
                {startDateTime.timeOnly} - {endDateTime.timeOnly}
              </p>
            </div>
          </div>
        </div>
      </div>
      <LeftContainer event={event} />
    </div>
  );
}

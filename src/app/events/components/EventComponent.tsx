import React from 'react';
import styles from './EventComponent.module.css';

import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { truncateText } from '../../../../helpers/truncateText';
import { formatDateTime } from '../../../../helpers/formateDateTime';
import LeftContainer from './LeftContainer';

import { useMobile } from '../../../../contexts/MobileContext';

import LocationIcon from '../[uid]/components/LocationIcon';
import CalendarIcon from '../[uid]/components/CalendarIcon';
import { RichTextField, asText } from '@prismicio/client';
import { EventDocument } from '../../../../prismicio-types';

interface EventProps {
  event: EventDocument;
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
                  asText(event.data.event_location) ?? '',
                  isMobile ? 25 : 100,
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
                {endDateTime.dayOnly !== startDateTime.dayOnly && (
                  <p className={styles.date}> - {endDateTime.dayOnly}</p>
                )}
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

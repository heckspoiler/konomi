'use client';
import React, { useEffect, useState } from 'react';
import styles from './Events.module.css';
import Link from 'next/link';
import Arrow from '../../arrow/Arrow';
import { truncateText } from '../../../../../helpers/truncateText';
import { formatDate } from '../../../../../helpers/formatDate';
import { EventDocument } from '../../../../../prismicio-types';
import { asText, DateField } from '@prismicio/client';

export default function Events({ events }: { events: EventDocument[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateBackground = () => {
      setIsMobile(window.innerWidth < 1020);
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, []);

  const currentDate = new Date();

  const sortedUpcomingEvents = events
    .filter((event: EventDocument) => {
      const eventDate = new Date(
        event.data.event_end_date ? event.data.event_end_date : '',
      );
      const bufferDate = new Date(currentDate.getTime() - 60 * 60 * 1000);
      return eventDate >= bufferDate && !event.tags.includes('archived');
    })
    .sort((a: any, b: any) => {
      return (
        new Date(a.data.event_start_date).getTime() -
        new Date(b.data.event_start_date).getTime()
      );
    });

  return (
    <div className={styles.scheduleContainer}>
      {sortedUpcomingEvents.length === 0 ? (
        <div className={styles.seeyou}>
          <h2>Wir sehen uns im 2026!</h2>
        </div>
      ) : (
        sortedUpcomingEvents
          .slice(0, 10)
          .map((event: EventDocument, index: number) => (
            <div key={index} className={styles.event}>
              <h4>
                {formatDate(
                  event.data.event_start_date
                    ? event.data.event_start_date
                    : '',
                )}
              </h4>{' '}
              <h2>
                {truncateText(
                  event.data?.event_title ? asText(event.data.event_title) : '',
                  isMobile ? 60 : 100,
                )}
              </h2>
              <Link href={`/events/${event.uid}`}>
                <span>
                  <h5>Mehr</h5>
                </span>
                <span>
                  <Arrow />
                </span>
              </Link>
            </div>
          ))
      )}
    </div>
  );
}

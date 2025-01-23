'use client';
import React, { useEffect, useState } from 'react';
import styles from './Events.module.css';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import Arrow from '../../arrow/Arrow';
import { truncateText } from '../../../../../helpers/truncateText';
import { formatDate } from '../../../../../helpers/formatDate';

export default function Events({ events }: { events: any }) {
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
    .filter((event: any) => {
      const eventDate = new Date(event.data.event_start_date);
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
      {sortedUpcomingEvents.slice(0, 10).map((event: any, index: number) => (
        <div key={index} className={styles.event}>
          <h2>
            {truncateText(event.data.event_title[0].text, isMobile ? 10 : 25)}
          </h2>
          <h4>{formatDate(event.data.event_start_date)}</h4>
          <Link href={`/events/${event.uid}`}>
            <span>
              <h5>Mehr</h5>
            </span>
            <span>
              <Arrow />
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

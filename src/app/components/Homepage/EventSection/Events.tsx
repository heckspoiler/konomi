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
    // Update background based on screen size
    const updateBackground = () => {
      if (window.innerWidth < 1020) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);

    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  return (
    <div className={styles.scheduleContainer}>
      {events.map((event: any, index: number) => (
        <div key={index} className={styles.event}>
          <h2>
            {truncateText(event.data.event_title[0].text, isMobile ? 10 : 15)}
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

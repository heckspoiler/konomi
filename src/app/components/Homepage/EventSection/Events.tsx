'use client';

import React from 'react';
import styles from './Events.module.css';
import Link from 'next/link';
import Arrow from '../../arrow/Arrow';
import { truncateText } from '@helpers/truncateText';
import { formatDate } from '@helpers/formatDate';
import { isUpcoming } from '@helpers/events';
import { EventSummary } from '@helpers/events';
import { asText } from '@prismicio/client';
import { useMobile } from '@contexts/MobileContext';
import { useNow } from '@contexts/NowContext';
import SeeYouNextYear from '../../SeeYouNextYear/SeeYouNextYear';

const MAX_EVENTS = 10;

/** `upcomingEvents` arrive sorted by start date. */
export default function Events({
  upcomingEvents: candidates,
  nextYear,
}: {
  upcomingEvents: EventSummary[];
  nextYear: number;
}) {
  const { isDesktop } = useMobile();
  const now = useNow();

  const upcomingEvents = candidates
    .filter((event) => isUpcoming(event, now))
    .slice(0, MAX_EVENTS);

  return (
    <div className={styles.scheduleContainer}>
      {upcomingEvents.length === 0 ? (
        <div className={styles.seeyou}>
          <SeeYouNextYear year={nextYear} />
        </div>
      ) : (
        upcomingEvents.map((event) => (
          <div key={event.id} className={styles.event}>
            <h4>{formatDate(event.data.event_start_date)}</h4>{' '}
            <h2>
              {truncateText(asText(event.data.event_title), isDesktop ? 75 : 30)}
            </h2>
            <Link href={`/events/${event.uid}`}>
              <span>
                <h5>Mehr</h5>
              </span>
              <span>
                <Arrow height={isDesktop ? '10' : '9'} />
              </span>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

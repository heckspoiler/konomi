import React from 'react';
import styles from './EventsContent.module.css';
import MainHeading from './MainHeading';
import EventComponent from './EventComponent';

export default function EventsContent({
  events,
  page,
}: {
  events: any;
  page: any;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.mainHeadingContainer}>
        <MainHeading page={page} />
      </div>
      <div className={styles.eventsContainer}>
        {events &&
          events.map((event: any, index: number) => (
            <EventComponent key={index} event={event} />
          ))}
      </div>
    </div>
  );
}

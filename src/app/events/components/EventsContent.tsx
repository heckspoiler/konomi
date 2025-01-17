'use client';

import React, { useEffect, useState } from 'react';
import styles from './EventsContent.module.css';
import MainHeading from './MainHeading';
import EventComponent from './EventComponent';
import BackToComponent from './BackToComponent';
import { usePathname } from 'next/navigation';

export default function EventsContent({
  events,
  page,
}: {
  events?: any;
  page: any;
}) {
  const pathname = usePathname();
  const [backComponent, setBackComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (pathname.startsWith('/events')) {
      setBackComponent(
        <div className={styles.backToContainer}>
          <BackToComponent text="Zum Archiv" url="/archive" />
        </div>
      );
    } else if (pathname.startsWith('/archive')) {
      setBackComponent(
        <BackToComponent text="Aktuelle Events" url="/events" />
      );
    }
  }, [pathname]);

  return (
    <div className={styles.container}>
      <MainHeading page={page} />
      <div className={styles.eventsContainer}>
        {events &&
          events.map((event: any, index: number) => (
            <EventComponent key={index} event={event} />
          ))}
      </div>
      {backComponent}
    </div>
  );
}

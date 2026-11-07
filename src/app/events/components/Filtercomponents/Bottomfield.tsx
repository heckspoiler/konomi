'use client';

import React from 'react';

import styles from './Bottomfield.module.css';

import EventType from './EventType';
import Location from './Location';
import Date from './Date';
import { EventSummary } from '@helpers/events';

export default function Bottomfield({
  events,
  fieldIsOpen,
}: {
  events: EventSummary[];
  fieldIsOpen: string;
}) {
  return (
    <div className={styles.container}>
      {fieldIsOpen === 'event' && <EventType />}
      {fieldIsOpen === 'location' && <Location events={events} />}
      {fieldIsOpen === 'date' && <Date events={events} />}
    </div>
  );
}

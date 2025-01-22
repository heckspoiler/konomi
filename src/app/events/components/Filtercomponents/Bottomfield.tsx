'use client';

import React, { useState, useEffect } from 'react';

import styles from './Bottomfield.module.css';
import EventType from './EventType';

import Location from './Location';

export default function Bottomfield({
  events,
  fieldIsOpen,
}: {
  events: any;
  fieldIsOpen: string;
}) {
  return (
    <div className={styles.container}>
      {fieldIsOpen === 'event' && <EventType />}
      {fieldIsOpen === 'location' && <Location events={events} />}
    </div>
  );
}

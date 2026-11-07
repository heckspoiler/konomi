'use client';

import React from 'react';
import styles from './LeftContainer.module.css';
import Link from 'next/link';
import IconComponent from './IconComponent';
import { EventSummary } from '@helpers/events';

export default function LeftContainer({ event }: { event: EventSummary }) {
  return (
    <div className={styles.leftContainer}>
      <IconComponent event={event} />
      <div className={styles.linkContainer}>
        <Link href={event.url as string}>Zum Event</Link>
      </div>
    </div>
  );
}

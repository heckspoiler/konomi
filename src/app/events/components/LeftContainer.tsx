'use client';

import React from 'react';
import styles from './LeftContainer.module.css';
import Link from 'next/link';
import IconComponent from './IconComponent';

export default function LeftContainer({ event }: { event: any }) {
  return (
    <div className={styles.leftContainer}>
      <IconComponent event={event} />
      <div className={styles.linkContainer}>
        <Link href={event.url}>Zum Event</Link>
      </div>
    </div>
  );
}

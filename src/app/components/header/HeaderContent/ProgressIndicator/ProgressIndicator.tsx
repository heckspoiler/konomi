'use client';

import React from 'react';
import styles from './ProgressIndicator.module.css';
import Link from 'next/link';

export default function ProgressIndicator({
  activeSection,
}: {
  activeSection: string;
}) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.link} ${activeSection === 'about' ? styles.active : ''}`}
      >
        <Link href="#about">Was ist Konomi?</Link>
      </div>

      <div
        className={`${styles.link} ${activeSection === 'events' ? styles.active : ''}`}
      >
        <Link href="#events">Wo ist Konomi?</Link>
      </div>

      <div
        className={`${styles.link} ${activeSection === 'konomi' ? styles.active : ''}`}
      >
        <Link href="#konomi">Wer ist Konomi?</Link>
      </div>

      <div
        className={`${styles.link} ${activeSection === 'why' ? styles.active : ''}`}
      >
        <Link href="#why">Warum ist Konomi?</Link>
      </div>
    </div>
  );
}

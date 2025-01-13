'use client';

import React from 'react';
import styles from './ProgressIndicator.module.css';
import Link from 'next/link';

export default function ProgressIndicator() {
  return (
    <div className={styles.container}>
      <div>
        <Link href="#about">Was ist Konomi?</Link>
      </div>

      <div>
        <Link href="#about">Wo ist Konomi?</Link>
      </div>

      <div>
        <Link href="#about">Wer ist Konomi?</Link>
      </div>

      <div>
        <Link href="#about">Warum ist Konomi?</Link>
      </div>
    </div>
  );
}

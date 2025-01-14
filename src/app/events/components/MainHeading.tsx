'use client';
import React from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './MainHeading.module.css';

export default function MainHeading({ page }: { page: any }) {
  return (
    <div className={styles.mainHeading}>
      <PrismicRichText field={page.data.page_title} />
      <div className={styles.subtitleContainer}>
        <PrismicRichText field={page.data.japanese_subtitles_first} />
        <PrismicRichText field={page.data.japanese_subtitles_second} />
      </div>
    </div>
  );
}

'use client';
import React from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './MainHeading.module.css';

export default function MainHeading({
  page,
  title,
}: {
  page?: any;
  title?: string;
}) {
  return (
    <div className={styles.mainHeadingContainer}>
      <div className={styles.mainHeading}>
        {title && title.length > 1 ? (
          <h2>{title}</h2>
        ) : (
          <PrismicRichText field={page.data.page_title} />
        )}

        <div className={styles.subtitleContainer}>
          <PrismicRichText field={page.data.japanese_subtitles_first} />
          <PrismicRichText field={page.data.japanese_subtitles_second} />
        </div>
      </div>
    </div>
  );
}

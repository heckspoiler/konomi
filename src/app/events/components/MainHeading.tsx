'use client';
import React from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './MainHeading.module.css';

export default function MainHeading({
  page,
  title,
  buttonShow,
}: {
  page?: any;
  title?: string;
  buttonShow?: any;
}) {
  console.log(buttonShow);
  return (
    <div className={styles.mainHeadingContainer}>
      <div className={styles.mainHeading}>
        {title && title.length > 1 ? (
          <div>
            <h2>{title}</h2>
            {buttonShow && <h3>ARCHIV</h3>}
          </div>
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

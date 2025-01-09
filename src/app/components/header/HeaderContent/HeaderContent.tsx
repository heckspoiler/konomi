'use client';

import { PrismicRichText } from '@prismicio/react';
import React from 'react';

import styles from './HeaderContent.module.css';

export default function HeaderContent({ content }: { content: any }) {
  return (
    <div className={styles.main}>
      <div className={styles.logoContainer}>
        <PrismicRichText field={content.page_title} />
        <PrismicRichText field={content.page_subtitle_date} />
      </div>
    </div>
  );
}

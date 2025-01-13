'use client';

import React from 'react';

import Link from 'next/link';
import { PrismicRichText } from '@prismicio/react';

import styles from './HeaderLogo.module.css';

export default function HeaderLogo({ content }: { content: any }) {
  return (
    <div className={styles.logoContainer}>
      <Link href="/">
        <PrismicRichText field={content.page_title} />
        <PrismicRichText field={content.page_subtitle_date} />
      </Link>
    </div>
  );
}

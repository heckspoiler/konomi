'use client';
import React, { useState, useEffect } from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './HeaderContent.module.css';
import Hamburger from './Hamburger/Hamburger';

import Navbar from './Navbar/Navbar';
import Link from 'next/link';

export default function HeaderContent({ content }: { content: any }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className={styles.main}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <PrismicRichText field={content.page_title} />
          <PrismicRichText field={content.page_subtitle_date} />
        </div>
      </Link>
      <div className={styles.hamburgerContainer}>
        <Hamburger menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      </div>
      <div
        className={`${styles.navbarContainer} ${menuIsOpen ? styles.open : ''}`}
      >
        <Navbar menuIsOpen={menuIsOpen} content={content} />
      </div>
    </div>
  );
}

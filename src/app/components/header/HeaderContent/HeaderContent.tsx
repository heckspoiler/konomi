'use client';
import React, { useState, useEffect } from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './HeaderContent.module.css';
import Hamburger from './Hamburger/Hamburger';

import Navbar from './Navbar/Navbar';
import Link from 'next/link';

import { useMobile } from '../../../../../contexts/MobileContext';
import ClickOverlay from './ClickOverlay';

export default function HeaderContent({ content }: { content: any }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { isMobile } = useMobile();

  return (
    <div className={styles.main}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <PrismicRichText field={content.page_title} />
          <PrismicRichText field={content.page_subtitle_date} />
        </Link>
      </div>
      <div className={styles.hamburgerContainer}>
        <Hamburger menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      </div>
      <div
        className={`${styles.navbarContainer} ${menuIsOpen ? styles.open : ''}`}
      >
        <Navbar menuIsOpen={menuIsOpen} content={content} />
      </div>
      <ClickOverlay
        isMobile={isMobile}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
      />
    </div>
  );
}

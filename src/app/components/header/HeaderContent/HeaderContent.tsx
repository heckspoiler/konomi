'use client';
import React, { useState, useEffect, useRef } from 'react'; // Add useRef
import { PrismicRichText } from '@prismicio/react';
import styles from './HeaderContent.module.css';
import Hamburger from './Hamburger/Hamburger';
import Navbar from './Navbar/Navbar';
import Link from 'next/link';
import { useMobile } from '../../../../../contexts/MobileContext';
import ClickOverlay from './ClickOverlay';
import ProgressIndicator from './ProgressIndicator/ProgressIndicator';
import HeaderLogo from './HeaderLogo/HeaderLogo';

export default function HeaderContent({ content }: { content: any }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { isMobile } = useMobile();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          '--header-height',
          `${height}px`
        );
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);

    // Update when content might change
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={headerRef} className={styles.main}>
      <HeaderLogo content={content} />
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

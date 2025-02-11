'use client';
import React, { useState, useEffect, useRef } from 'react'; // Add useRef
import styles from './HeaderContent.module.css';
import Hamburger from './Hamburger/Hamburger';
import Navbar from './Navbar/Navbar';
import { useMobile } from '../../../../../contexts/MobileContext';
import ClickOverlay from './ClickOverlay';
import HeaderLogo from './HeaderLogo/HeaderLogo';

import { usePathname } from 'next/navigation';

import Image from 'next/image';

export default function HeaderContent({
  content,
  hero,
}: {
  content: any;
  hero: any;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { isMobile } = useMobile();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHome, setIsHome] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    pathname === '/' ? setIsHome(true) : setIsHome(false);
  }, [pathname]);

  useEffect(() => {
    if (hero?.data?.hero_image?.url) {
      document.documentElement.style.setProperty(
        '--hero-image',
        `url(${hero.data.hero_image.url})`
      );
    }
    return () => {
      document.documentElement.style.removeProperty('--hero-image');
    };
  }, [hero?.data?.hero_image?.url]);

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

    updateHeaderHeight();

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
    <div
      ref={headerRef}
      className={`${styles.main} ${isHome && !isMobile ? styles.noBG : ''}`}
    >
      <HeaderLogo
        content={content}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
      />
      <div className={styles.hamburgerContainer}>
        <Hamburger menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      </div>
      <div
        className={`${styles.navbarContainer} ${menuIsOpen ? styles.open : ''}`}
      >
        <Navbar
          menuIsOpen={menuIsOpen}
          content={content}
          setMenuIsOpen={setMenuIsOpen}
          hero={hero}
        />
        <div className={styles.heroImage}>
          <Image
            src={hero.data.hero_image.url}
            alt={hero.data.hero_image.alt}
            width={4961 / 7}
            height={7016 / 7}
          />
        </div>
      </div>

      <ClickOverlay
        isMobile={isMobile}
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
      />
    </div>
  );
}

'use client';

import React from 'react';
import { PrismicNextImage } from '@prismicio/next';

import styles from './LogoContent.module.css';

export default function LogoContent({ logo }: { logo: any }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`${styles.logoContainer} cursor-pointer`}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToTop();
        }
      }}
    >
      <PrismicNextImage field={logo.data.logo_image} />
    </div>
  );
}

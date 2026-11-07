'use client';

import React from 'react';
import { PrismicNextImage } from '@prismicio/next';

import styles from './LogoContent.module.css';
import { LogoDocument } from '@/prismicio-types';

export default function LogoContent({ logo }: { logo: LogoDocument }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`unstyled-button ${styles.logoContainer}`}
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
    >
      <PrismicNextImage field={logo.data.logo_image} alt="" />
    </button>
  );
}

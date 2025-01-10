'use client';

import { PrismicNextImage } from '@prismicio/next';
import React from 'react';

export default function LogoContent({
  styles,
  data,
}: {
  styles: any;
  data: any;
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scroll animation smooth
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
      <PrismicNextImage field={data.data.logo_image} />
    </div>
  );
}

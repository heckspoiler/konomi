'use client';

import React from 'react';
import styles from './ProgressIndicator.module.css';
import { LandingCategoriesDocument } from '@/prismicio-types';

export default function ProgressIndicator({
  activeSection,
  landingCategories,
}: {
  activeSection: string;
  landingCategories: LandingCategoriesDocument;
}) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={styles.container}>
      {landingCategories.data.categories.map((item, index) => (
        <button
          className={`${styles.link} ${activeSection === item.category_key ? styles.active : ''}`}
          key={index}
          onClick={() => scrollToSection(item.category_key ?? '')}
        >
          {item.category}
        </button>
      ))}
    </div>
  );
}

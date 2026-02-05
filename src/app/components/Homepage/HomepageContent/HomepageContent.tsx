'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './HomepageContent.module.css';

import AboutSection from '../AboutSection/AboutSection';
import EventSection from '../EventSection/EventSection';

import GallerySection from '../GallerySection/GallerySection';
import ProgressIndicator from '../../header/HeaderContent/ProgressIndicator/ProgressIndicator';

import { components } from '@/slices';

import MainSection from './MainSection/MainSection';

import {
  DownloadBarDocument,
  LandingCategoriesDocument,
  NewsarticleDocument,
  PageDocumentDataSlicesSlice,
} from '../../../../../prismicio-types';
import NewsSection from '../NewsSection/NewsSection';

interface HomepageContentProps {
  defaultVariationSlice: PageDocumentDataSlicesSlice[];
  scheduleSlice: PageDocumentDataSlicesSlice[];
  konomiSlice: PageDocumentDataSlicesSlice[];
  newsSlice: PageDocumentDataSlicesSlice[];
  news: NewsarticleDocument[];
  landingCategories: LandingCategoriesDocument;
  downloadBar: DownloadBarDocument;
  galleryDefaultSlice: PageDocumentDataSlicesSlice[];
}

type SectionId =
  | 'about'
  | 'events'
  | 'konomi'
  | 'why'
  | 'gallery'
  | 'news'
  | '';

export default function HomepageContent({
  defaultVariationSlice,
  scheduleSlice,
  newsSlice,
  galleryDefaultSlice,
  landingCategories,
  downloadBar,
  news,
}: HomepageContentProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('');
  const aboutRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionRefs = {
      about: aboutRef,
      events: eventsRef,
      gallery: galleryRef,
      newsRef: newsRef,
    };

    const options = {
      root: document,
      rootMargin: '10% 0px 0px 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as SectionId;
          setActiveSection(sectionId);
        }
      });
    }, options);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const sectionConfig = [
    {
      id: 'about',
      ref: aboutRef,
      component: (
        <AboutSection
          defaultVariationSlice={defaultVariationSlice}
          components={components}
        />
      ),
    },
    {
      id: 'news',
      ref: newsRef,
      component: (
        <NewsSection
          newsSlice={newsSlice}
          components={components}
          news={news}
        />
      ),
    },
    {
      id: 'events',
      ref: eventsRef,
      component: (
        <EventSection
          scheduleSlice={scheduleSlice}
          components={components}
          downloadBar={downloadBar}
        />
      ),
    },
  ];

  return (
    <section className={styles.main}>
      <div className={styles.gallerysection} id="gallery" ref={galleryRef}>
        <GallerySection
          gallerySlice={galleryDefaultSlice}
          components={components}
        />
      </div>
      <div className={styles.allsections}>
        {sectionConfig.map(({ id, ref, component }) => (
          <MainSection key={id} ref={ref} id={id}>
            {component}
          </MainSection>
        ))}
      </div>
      <ProgressIndicator
        activeSection={activeSection}
        landingCategories={landingCategories}
      />
    </section>
  );
}

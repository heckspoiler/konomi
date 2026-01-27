'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './HomepageContent.module.css';

import AboutSection from '../AboutSection/AboutSection';
import EventSection from '../EventSection/EventSection';
import KonomiSection from '../KonomiSection/KonomiSection';
import WhySection from '../WhySection/WhySection';
import ProgressIndicator from '../../header/HeaderContent/ProgressIndicator/ProgressIndicator';

import { components } from '@/slices';

import MainSection from './MainSection/MainSection';

import {
  BasicSliceSlice,
  DownloadBarDocument,
  LandingCategoriesDocument,
} from '../../../../../prismicio-types';

interface HomepageContentProps {
  defaultVariationSlice: BasicSliceSlice[];
  scheduleSlice: BasicSliceSlice[];
  konomiSlice: BasicSliceSlice[];
  whySlice: BasicSliceSlice[];
  landingCategories: LandingCategoriesDocument;
  downloadBar: DownloadBarDocument;
}

type SectionId = 'about' | 'events' | 'konomi' | 'why' | '';

export default function HomepageContent({
  defaultVariationSlice,
  scheduleSlice,
  konomiSlice,
  whySlice,
  landingCategories,
  downloadBar,
}: HomepageContentProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('');
  const aboutRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const konomiRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionRefs = {
      about: aboutRef,
      events: eventsRef,
      konomi: konomiRef,
      why: whyRef,
    };

    const options = {
      root: null,
      rootMargin: '-48% 0px -48% 0px',
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
    {
      id: 'konomi',
      ref: konomiRef,
      component: (
        <KonomiSection konomiSlice={konomiSlice} components={components} />
      ),
    },
    {
      id: 'why',
      ref: whyRef,
      component: <WhySection whySlice={whySlice} components={components} />,
    },
  ];

  return (
    <section className={styles.main}>
      {sectionConfig.map(({ id, ref, component }) => (
        <MainSection key={id} ref={ref} id={id}>
          {component}
        </MainSection>
      ))}
      <ProgressIndicator
        activeSection={activeSection}
        landingCategories={landingCategories}
      />
    </section>
  );
}

'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './HomepageContent.module.css';

import AboutSection from '../AboutSection/AboutSection';
import EventSection from '../EventSection/EventSection';
import KonomiSection from '../KonomiSection/KonomiSection';
import WhySection from '../WhySection/WhySection';
import ProgressIndicator from '../../header/HeaderContent/ProgressIndicator/ProgressIndicator';

import { components } from '@/slices';

import { useMobile } from '../../../../../contexts/MobileContext';

import { eventsStore } from '../../../../../stores/eventStore';

interface HomepageContentProps {
  defaultVariationSlice: any;
  eventsPass: any;
  scheduleSlice: any;
  konomiSlice: any;
  whySlice: any;
}

type SectionId = 'about' | 'events' | 'konomi' | 'why';

export default function HomepageContent({
  defaultVariationSlice,
  eventsPass,
  scheduleSlice,
  konomiSlice,
  whySlice,
}: HomepageContentProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('about');
  const aboutRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const konomiRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState<number>(0.1);

  const { events, setEvents } = eventsStore() as {
    events: Object[];
    setEvents: (value: boolean) => void;
  };

  useEffect(() => {
    if (eventsPass) {
      setEvents(eventsPass);
    }
  }, [eventsPass]);

  const { isMobile } = useMobile();

  useEffect(() => {
    if (isMobile) {
      setThreshold(0.5);
    } else {
      setThreshold(0.1);
    }
  }, [isMobile]);

  useEffect(() => {
    const sectionRefs = {
      about: aboutRef,
      events: eventsRef,
      konomi: konomiRef,
      why: whyRef,
    };

    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as SectionId;
          setActiveSection(sectionId);
        }
      });
    }, options);

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup
    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <section className={styles.main}>
      <div id="about" ref={aboutRef} className={styles.section}>
        <AboutSection
          defaultVariationSlice={defaultVariationSlice}
          components={components}
        />
      </div>
      <div id="events" ref={eventsRef} className={styles.section}>
        <EventSection
          scheduleSlice={scheduleSlice}
          events={events}
          components={components}
        />
      </div>
      <div id="konomi" ref={konomiRef} className={styles.section}>
        <KonomiSection konomiSlice={konomiSlice} components={components} />
      </div>
      <div id="why" ref={whyRef} className={styles.section}>
        <WhySection whySlice={whySlice} components={components} />
      </div>
      <ProgressIndicator activeSection={activeSection} />
    </section>
  );
}

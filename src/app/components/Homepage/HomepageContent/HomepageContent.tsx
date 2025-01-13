import React from 'react';

import styles from './HomepageContent.module.css';

import AboutSection from '../AboutSection/AboutSection';
import EventSection from '../EventSection/EventSection';
import KonomiSection from '../KonomiSection/KonomiSection';
import WhySection from '../WhySection/WhySection';
import ProgressIndicator from '../../header/HeaderContent/ProgressIndicator/ProgressIndicator';

export default function HomepageContent({
  defaultVariationSlice,
  events,
  scheduleSlice,
  konomiSlice,
  whySlice,
  components,
}: {
  defaultVariationSlice: any;
  events: any;
  scheduleSlice: any;
  konomiSlice: any;
  whySlice: any;
  components: any;
}) {
  return (
    <section className={styles.main}>
      <div id="about">
        <AboutSection
          defaultVariationSlice={defaultVariationSlice}
          components={components}
        />
      </div>
      <div id="events">
        <EventSection
          scheduleSlice={scheduleSlice}
          components={components}
          events={events}
        />
      </div>
      <div id="konomi">
        <KonomiSection konomiSlice={konomiSlice} components={components} />
      </div>
      <div id="why">
        <WhySection whySlice={whySlice} components={components} />
      </div>
      <ProgressIndicator />
    </section>
  );
}

import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import styles from './EventSection.module.css';

import { PrismicRichText, SliceZone } from '@prismicio/react';
export default function EventSection({
  scheduleSlice,
  components,
  events,
}: {
  scheduleSlice: any;
  components: any;
  events: any;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={scheduleSlice} components={components} />
      <div className={styles.scheduleContainer}>
        {events.map((event: any) => (
          <div key={event.id}>
            <PrismicRichText field={event.data.event_title} />
            <p>{event.data.event_start_date}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

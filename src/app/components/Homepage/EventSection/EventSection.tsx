import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import styles from './EventSection.module.css';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import Events from './Events';
import Link from 'next/link';
import Arrow from '../../arrow/Arrow';
import { PrismicNextLink } from '@prismicio/next';
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
      <div className={styles.programContainer}>
        <PrismicRichText field={scheduleSlice[0].primary.program_heading} />
        <PrismicRichText field={scheduleSlice[0].primary.program_text} />
        <Events events={events} />
        <div className={styles.moreEventsLink}>
          <PrismicNextLink field={scheduleSlice[0].primary.more_events_link} />
          <Arrow height={'15'} width={'14'} />
        </div>
      </div>
    </SectionContainer>
  );
}

import React, { useMemo } from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import styles from './EventSection.module.css';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import Events from './Events';
import Link from 'next/link';
import Arrow from '../../arrow/Arrow';
import { PrismicNextLink } from '@prismicio/next';
import { useEvents } from '../../../../../contexts/EventsContext';
import { EventDocument } from '../../../../../prismicio-types';

export default function EventSection({
  scheduleSlice,
  components,
}: {
  scheduleSlice: any;
  components: any;
}) {
  const { events } = useEvents();

  const now = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(
    () =>
      events?.filter(
        (event: EventDocument) =>
          new Date(event.data.event_end_date as string).getTime() >
          now.getTime(),
      ),
    [events, now],
  );

  return (
    <SectionContainer>
      <div className={styles.programContainer}>
        {' '}
        <SliceZone slices={scheduleSlice} components={components} />
        <div className={styles.programText}>
          <PrismicRichText field={scheduleSlice[0].primary.program_text} />
        </div>
        <Events events={events} />
        <div className={styles.moreEventsLink}>
          {upcomingEvents.length === 0 ? (
            <Link href="/archive">
              Zum Archiv <Arrow height={'12'} width={'12'} />
            </Link>
          ) : (
            <PrismicNextLink field={scheduleSlice[0].primary.more_events_link}>
              <>{scheduleSlice[0].primary.more_events_link.text}</>
              <Arrow height={'12'} width={'12'} />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

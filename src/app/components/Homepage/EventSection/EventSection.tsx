import React, { useMemo } from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import styles from './EventSection.module.css';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import Events from './Events';
import Link from 'next/link';
import Arrow from '../../arrow/Arrow';
import { PrismicNextLink } from '@prismicio/next';
import { useEvents } from '../../../../../contexts/EventsContext';
import {
   BasicSliceSliceSchedulePrimary,
  DownloadBarDocument,
  EventDocument,
  PageDocumentDataSlicesSlice,
} from '../../../../../prismicio-types';

import type { components as SliceComponents } from '@/slices';

export default function EventSection({
  scheduleSlice,
  components,
  downloadBar,
}: {
  scheduleSlice: PageDocumentDataSlicesSlice[];
  components: typeof SliceComponents;
  downloadBar: DownloadBarDocument;
}) {
  const { events } = useEvents();
  const schedulePrimary = scheduleSlice[0]
    .primary as BasicSliceSliceSchedulePrimary;

  const now = useMemo(() => new Date(), []);

  const upcomingEvents = useMemo(
    () =>
      events?.filter(
        (event: EventDocument) =>
          new Date(event.data.event_end_date as string).getTime() >
          now.getTime(),
      ) ?? [],
    [events, now],
  );

  return (
    <SectionContainer>
      <div className={styles.programContainer}>
        {' '}
        <SliceZone slices={scheduleSlice} components={components} />
        <div className={styles.programText}>
          <PrismicRichText field={schedulePrimary.program_text} />
        </div>
        <Events events={events} />
        <div className={styles.moreEventsLink}>
          {upcomingEvents.length === 0 ? (
            <Link href="/archive">
              Zum Archiv <Arrow height={'12'} width={'12'} />
            </Link>
          ) : (
            <PrismicNextLink field={schedulePrimary.more_events_link}>
              <>{schedulePrimary.more_events_link.text}</>
              <Arrow height={'12'} width={'12'} />
            </PrismicNextLink>
          )}
        </div>
        {downloadBar.data.is_downloadbar_visible && (
          <div className={styles.downloads}>
            <div className={styles.downloadbar}>
              {downloadBar.data.download_bar.map((item, index) => (
                <PrismicNextLink field={item.item} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

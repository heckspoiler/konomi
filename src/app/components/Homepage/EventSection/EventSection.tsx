
import SectionContainer from '../SectionContainer/SectionContainer';

import styles from './EventSection.module.css';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import Events from './Events';
import Link from 'next/link';
import Arrow from '../../arrow/Arrow';
import { PrismicNextLink } from '@prismicio/next';
import { useNow } from '@contexts/NowContext';
import { isUpcoming } from '@helpers/events';
import {
  BasicSliceSliceSchedulePrimary,
  DownloadBarDocument,
  PageDocumentDataSlicesSlice,
} from '@/prismicio-types';

import type { components as SliceComponents } from '@/slices';
import { EventSummary } from '@helpers/events';

export default function EventSection({
  scheduleSlice,
  components,
  downloadBar,
  upcomingEvents,
  nextYear,
}: {
  scheduleSlice: PageDocumentDataSlicesSlice[];
  components: typeof SliceComponents;
  downloadBar: DownloadBarDocument;
  upcomingEvents: EventSummary[];
  nextYear: number;
}) {
  const now = useNow();
  const schedulePrimary = scheduleSlice[0]
    .primary as BasicSliceSliceSchedulePrimary;

  const hasUpcomingEvents = upcomingEvents.some((event) =>
    isUpcoming(event, now),
  );

  return (
    <SectionContainer>
      <div className={styles.programContainer}>
        <SliceZone slices={scheduleSlice} components={components} />
        <div className={styles.programText}>
          <PrismicRichText field={schedulePrimary.program_text} />
        </div>
        <Events upcomingEvents={upcomingEvents} nextYear={nextYear} />
        <div className={styles.moreEventsLink}>
          {!hasUpcomingEvents ? (
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
              {downloadBar.data.download_bar.map((item) => (
                <PrismicNextLink field={item.item} key={item.item.text} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

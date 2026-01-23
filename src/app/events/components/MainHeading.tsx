'use client';
import React from 'react';

import { PrismicRichText } from '@prismicio/react';

import styles from './MainHeading.module.css';
import {
  AboutDocument,
  ArchiveDocument,
  EventDocument,
  EventsDocument,
  EventsDocumentData,
  ImpressumDocument,
  Simplify,
} from '../../../../prismicio-types';
import { PrismicDocumentWithUID } from '@prismicio/client';

export default function MainHeading({
  page,
  title,
  buttonShow,
}: {
  page:
    | EventsDocument
    | ArchiveDocument
    | AboutDocument
    | ImpressumDocument
    | EventDocument
    | PrismicDocumentWithUID<Simplify<EventsDocumentData>>;
  title?: string;
  buttonShow?: boolean;
}) {
  return (
    <div className={styles.mainHeadingContainer}>
      <div className={styles.mainHeading}>
        {title && title.length > 1 ? (
          <div>
            <h2>{title}</h2>
            {buttonShow && <h3>ARCHIV</h3>}
          </div>
        ) : (
          'page_title' in page.data && (
            <PrismicRichText field={page.data.page_title} />
          )
        )}

        {'japanese_subtitles_first' in page.data &&
          'japanese_subtitles_second' in page.data && (
            <div className={styles.subtitleContainer}>
              <PrismicRichText field={page.data.japanese_subtitles_first} />
              <PrismicRichText field={page.data.japanese_subtitles_second} />
            </div>
          )}
      </div>
    </div>
  );
}

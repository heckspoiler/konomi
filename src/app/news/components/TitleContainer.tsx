import React from 'react';
import { NewsDocument } from '../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import styles from './TitleContainer.module.css';

type TitleContainerProps = {
  page: NewsDocument;
  length?: number;
};

export default function TitleContainer({ page, length }: TitleContainerProps) {
  return (
    <div className={styles.mainHeadingContainer}>
      <div className={styles.mainHeading}>
        <div className={styles.titlecontainer}>
          <PrismicRichText field={page.data.page_title} />
          {length && <h5>({length})</h5>}
        </div>
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

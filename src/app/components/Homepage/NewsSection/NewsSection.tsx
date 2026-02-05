import React from 'react';

import styles from './NewsSection.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';

import { SliceZone } from '@prismicio/react';
import {
  BasicSliceSliceNewsPrimary,
  NewsarticleDocument,
  PageDocumentDataSlicesSlice,
} from '../../../../../prismicio-types';
import type { components as SliceComponents } from '@/slices';
import NewsItem from './Newsitem';
import { PrismicNextLink } from '@prismicio/next';
import Arrow from '../../arrow/Arrow';

type NewsSectionProps = {
  newsSlice: PageDocumentDataSlicesSlice[];
  components: typeof SliceComponents;
  news: NewsarticleDocument[];
};

export default function NewsSection({
  newsSlice,
  components,
  news,
}: NewsSectionProps) {
  const newsSlicePrimary = newsSlice[0].primary as BasicSliceSliceNewsPrimary;

  return (
    <SectionContainer>
      <div className={styles.newsContainer}>
        <SliceZone slices={newsSlice} components={components} />
      </div>
      <div className={styles.newspreviews}>
        {news
          .sort(
            (a, b) =>
              new Date(b.data.publishing_date as string).getTime() -
              new Date(a.data.publishing_date as string).getTime(),
          )
          .map((item, index) => (
            <NewsItem
              key={index}
              item={item}
              newsSlicePrimary={newsSlicePrimary}
            />
          ))}
      </div>
      <div className={styles.linkcontainer}>
        <PrismicNextLink field={newsSlicePrimary.more_news_link}>
          {newsSlicePrimary.more_news_link.text}
          <Arrow height="12" width="12" />
        </PrismicNextLink>
      </div>
    </SectionContainer>
  );
}

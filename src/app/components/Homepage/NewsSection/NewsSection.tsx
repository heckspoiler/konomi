import React from 'react';

import styles from './NewsSection.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';

import { SliceZone } from '@prismicio/react';
import {
  NewsarticleDocument,
  PageDocumentDataSlicesSlice,
} from '../../../../../prismicio-types';
import type { components as SliceComponents } from '@/slices';
import NewsItem from './Newsitem';

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
  return (
    <SectionContainer>
      <div className={styles.newsContainer}>
        <SliceZone slices={newsSlice} components={components} />
      </div>
      <div className={styles.newspreviews}>
        {news.map((item, index) => (
          <NewsItem key={index} item={item} />
        ))}
      </div>
    </SectionContainer>
  );
}

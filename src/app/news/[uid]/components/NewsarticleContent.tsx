import React from 'react';
import {
  NewsarticleDocument,
  NewsDocument,
} from '../../../../../prismicio-types';

import styles from './NewsarticleContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import TitleContainer from '../../components/TitleContainer';
import DateComponent from '@/app/events/[uid]/components/DateComponent';
import EventImage from '@/app/events/[uid]/components/EventImage';
import { PrismicNextLink } from '@prismicio/next';
import IconComponentNews from '../../components/IconComponentNews';

type NewsArticleContentProps = {
  page: NewsarticleDocument;
  newsPage: NewsDocument;
};

export default function NewsarticleContent({
  page,
  newsPage,
}: NewsArticleContentProps) {
  return (
    <div className={styles.container}>
      <TitleContainer page={newsPage} />
      <div className={styles.content}>
        <div className={styles.titlecontainer}>
          <PrismicRichText field={page.data.title} />
        </div>
        <div className={styles.middlecontainer}>
          <IconComponentNews page={page} />
          <div className={styles.date}>
            <DateComponent variant="news" document={page} />
          </div>
        </div>
        <EventImage image={page.data.hero_image} />
        <div className={styles.descriptioncontainer}>
          <PrismicRichText field={page.data.description} />
        </div>{' '}
        <div className={styles.backtolink}>
          <PrismicNextLink href={newsPage.url as string}>
            Zurück
          </PrismicNextLink>
        </div>
      </div>
    </div>
  );
}

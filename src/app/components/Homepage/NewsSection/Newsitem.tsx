import React, { useMemo } from 'react';

import styles from './Newsitem.module.css';

import {
  BasicSliceSliceNewsPrimary,
  NewsarticleDocument,
} from '@/prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';

import { truncateText } from '@helpers/truncateText';
import { asText } from '@prismicio/client';

import { useMobile } from '@contexts/MobileContext';
import Arrow from '../../arrow/Arrow';
import { PrismicRichText } from '@prismicio/react';

type Props = {
  item: NewsarticleDocument;
  newsSlicePrimary: BasicSliceSliceNewsPrimary;
};

export default function NewsItem({ item, newsSlicePrimary }: Props) {
  const { isMobile } = useMobile();

  const height = useMemo(() => {
    return isMobile ? '8.5' : '15';
  }, [isMobile]);

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <Link href={item.url as string}>
          <PrismicNextImage field={item.data.hero_image} />
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.titlecontainer}>
          <h3>
            {truncateText(
              item.data.title ? asText(item.data.title) : '',
              isMobile ? 26 : 100,
            )}
          </h3>
        </div>
        <div className={styles.description}>
          <p>{asText(item.data.description)}</p>
        </div>{' '}
        <div className={styles.linkcontainer}>
          <Link href={item.url as string}>
            {newsSlicePrimary.item_link_text} <Arrow height={height} />
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

import styles from './Newsitem.module.css';

import { NewsarticleDocument } from '../../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';

import { truncateText } from '../../../../../helpers/truncateText';
import { asText } from '@prismicio/client';

import { useMobile } from '../../../../../contexts/MobileContext';
import Arrow from '../../arrow/Arrow';

type Props = {
  item: NewsarticleDocument;
};

export default function NewsItem({ item }: Props) {
  const { isMobile } = useMobile();

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <PrismicNextImage field={item.data.hero_image} />
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
          <p>
            {truncateText(
              item.data.description ? asText(item.data.description) : '',
              isMobile ? 60 : 160,
            )}
          </p>{' '}
        </div>{' '}
        <div className={styles.linkcontainer}>
          <Link href={item.url as string}>
            Zum Artikel <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}

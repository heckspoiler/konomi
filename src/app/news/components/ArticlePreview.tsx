import React from 'react';

import styles from './ArticlePreview.module.css';
import { NewsarticleDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { formatDate } from '../../../../helpers/formatDate';
import Link from 'next/link';

import Arrow from '@/app/components/arrow/Arrow';

type ArticlePreviewProps = { article: NewsarticleDocument };

export default function ArticlePreview({ article }: ArticlePreviewProps) {
  return (
    <div className={styles.articlepreview}>
      <div className={styles.uppercontainer}>
        <div className={styles.date}>
          <p>{formatDate(article.first_publication_date)}</p>
        </div>
        <div className={styles.tags}>
          {article.data.tags.map((item) => (
            <p>{item.item}</p>
          ))}
        </div>
      </div>
      <div className={styles.imagecontainer}>
        <PrismicNextImage field={article.data.hero_image} />
      </div>
      <div className={styles.titlecontainer}>
        <PrismicRichText field={article.data.title} />
      </div>
      <div className={styles.descriptioncontainer}>
        <PrismicRichText field={article.data.description} />
      </div>
      <div className={styles.link}>
        <Link href={article.url as string}>Zum Artikel</Link>
        <Arrow />
      </div>
    </div>
  );
}

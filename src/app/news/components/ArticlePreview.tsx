import React from 'react';

import styles from './ArticlePreview.module.css';
import { NewsarticleDocument } from '@/prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import TagContainer from './TagContainer';

export type ArticlePreviewProps = { article: NewsarticleDocument };

export default function ArticlePreview({ article }: ArticlePreviewProps) {
  const date = article.data.publishing_date?.split('-').reverse().join('.');

  return (
    <div className={styles.articlepreview} key={article.id}>
      <div className={styles.uppercontainer}>
        <div className={styles.date}>
          <p>{date}</p>
        </div>
        <TagContainer article={article} />
      </div>
      <div className={styles.imagecontainer}>
        <PrismicNextImage field={article.data.hero_image} />
      </div>
      <div className={styles.textcontainer}>
        <div className={styles.titlecontainer}>
          <PrismicRichText field={article.data.title} />
        </div>
        <div className={styles.descriptioncontainer}>
          <PrismicRichText field={article.data.description} />
        </div>
      </div>
      <div className={styles.link}>
        <Link href={article.url as string}>Zum Artikel</Link>
      </div>
    </div>
  );
}

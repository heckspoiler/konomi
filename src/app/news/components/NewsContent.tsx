import React from 'react';

import styles from './NewsContent.module.css';

import { NewsarticleDocument, NewsDocument } from '@/prismicio-types';
import ArticlePreview from './ArticlePreview';
import TitleContainer from './TitleContainer';
import NewsletterForm from '@/app/components/Homepage/AboutSection/NewsletterForm';

type NewsContentProps = {
  page: NewsDocument;
  articles: NewsarticleDocument[];
};

export default function NewsContent({ page, articles }: NewsContentProps) {
  const length = articles.length;

  return (
    <div className={styles.container}>
      <TitleContainer page={page} length={length} />
      <div className={styles.previewcontainer}>
        {articles.slice(0, 5).map((article, index) => (
          <ArticlePreview article={article} key={index} />
        ))}
      </div>{' '}
      <div className={styles.newslettercontainer}>
        <NewsletterForm />
      </div>
      <div className={styles.previewcontainer}>
        {articles.slice(5, articles.length).map((article, index) => (
          <ArticlePreview article={article} key={index} />
        ))}
      </div>{' '}
    </div>
  );
}

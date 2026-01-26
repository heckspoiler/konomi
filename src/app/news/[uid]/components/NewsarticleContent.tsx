import React from 'react';
import { NewsarticleDocument } from '../../../../../prismicio-types';

import styles from './NewsarticleContent.module.css';

type NewsArticleContentProps = {
  page: NewsarticleDocument;
};

export default function NewsarticleContent({ page }: NewsArticleContentProps) {
  console.log(page);
  return <div className={styles.container}>NewsarticleContent</div>;
}

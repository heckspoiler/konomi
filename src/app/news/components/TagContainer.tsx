import React from 'react';
import { NewsarticleDocument } from '../../../../prismicio-types';

import styles from './TagContainer.module.css';

type Props = { article: NewsarticleDocument };

export default function TagContainer({ article }: Props) {
  return (
    <div className={styles.tags}>
      {article.data.tags.map((tag, index) => (
        <p key={index}>{tag.item}</p>
      ))}
    </div>
  );
}

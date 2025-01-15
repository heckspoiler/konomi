import React from 'react';

import styles from './EventImage.module.css';
import { PrismicNextImage } from '@prismicio/next';

export default function EventImage({ image }: { image: any }) {
  return (
    <div className={styles.imageContainer}>
      <PrismicNextImage field={image} />
    </div>
  );
}

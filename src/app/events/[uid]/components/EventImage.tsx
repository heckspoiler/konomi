import React from 'react';

import styles from './EventImage.module.css';
import { PrismicNextImage } from '@prismicio/next';

export default function EventImage({ image }: { image: any }) {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.overlay}></div>
      <PrismicNextImage field={image} />
    </div>
  );
}

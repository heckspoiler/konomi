import React from 'react';

import styles from './EventImage.module.css';
import { PrismicNextImage } from '@prismicio/next';
import { ImageFieldImage } from '@prismicio/client';

export default function EventImage({ image }: { image: ImageFieldImage }) {
  return (
    <div className={styles.imageContainer}>
      <PrismicNextImage field={image} />
    </div>
  );
}

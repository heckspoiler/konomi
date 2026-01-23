import React from 'react';
import styles from './OverlayImage.module.css';
import { PrismicNextImage } from '@prismicio/next';
import { ImageFieldImage } from '@prismicio/client';

export default function OverlayImage({ image }: { image: ImageFieldImage }) {
  return (
    <div className={styles.container}>
      <div className={styles.crossContainer}>
        <div></div>
        <div></div>
      </div>
      <div className={styles.imageContainer}>
        <PrismicNextImage field={image} />
      </div>
    </div>
  );
}

import React from 'react';
import styles from './OverlayImage.module.css';
import { PrismicNextImage } from '@prismicio/next';

export default function OverlayImage({ image }: { image: any }) {
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

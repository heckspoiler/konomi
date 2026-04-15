'use client';

import React, { useState, useEffect } from 'react';
import styles from './OverlayImage.module.css';
import { PrismicNextImage } from '@prismicio/next';
import { GroupField, ImageFieldImage } from '@prismicio/client';
import {
  EventDocumentDataGalleryItem,
  GallerySliceDefaultPrimaryImagesItem,
  Simplify,
} from '@/prismicio-types';

export default function OverlayImage({
  image,
  activeImage,
  images,
}: {
  image?: ImageFieldImage;
  activeImage: number;
  images:
    | GroupField<Simplify<EventDocumentDataGalleryItem>>
    | GroupField<Simplify<GallerySliceDefaultPrimaryImagesItem>>
    | undefined;
}) {
  const currentField = images?.length ? images[activeImage].image : image;
  const currentUrl = currentField?.url;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [currentUrl]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <PrismicNextImage
          key={currentUrl}
          field={currentField}
          onLoad={() => setIsLoading(true)}
          className={isLoading ? styles.imageLoading : styles.imageLoaded}
        />
        {isLoading && (
          <div className={styles.spinnerOverlay} aria-live="polite">
            <p className={styles.spinner}>Ko</p>
            <p className={styles.spinner}>no</p>
            <p className={styles.spinner}>mi</p>
          </div>
        )}
      </div>
    </div>
  );
}

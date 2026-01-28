import React from 'react';
import styles from './OverlayImage.module.css';
import { PrismicNextImage } from '@prismicio/next';
import { GroupField, ImageFieldImage } from '@prismicio/client';
import {
  EventDocumentDataGalleryItem,
  Simplify,
} from '../../../../../prismicio-types';

export default function OverlayImage({
  image,
  activeImage,
  images,
}: {
  image: ImageFieldImage;
  activeImage: number;
  images: GroupField<Simplify<EventDocumentDataGalleryItem>>;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <PrismicNextImage
          field={images?.length ? images[activeImage].image : image}
        />
      </div>
    </div>
  );
}

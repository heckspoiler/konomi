import { GroupField } from '@prismicio/client';
import React, { Dispatch, SetStateAction } from 'react';
import {
  EventDocumentDataGalleryItem,
  Simplify,
} from '../../../../../prismicio-types';

import styles from './Gallery.module.css';
import { PrismicNextImage } from '@prismicio/next';

type GalleryProps = {
  images: GroupField<Simplify<EventDocumentDataGalleryItem>>;
  activeImage?: number;
  setActiveImage?: Dispatch<SetStateAction<number>>;
};

export default function Gallery({
  images,
  setActiveImage,
  activeImage,
}: GalleryProps) {
  return (
    <div className={styles.gallerycontainer}>
      {images &&
        images.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveImage && setActiveImage(index)}
            className={`${styles.galleryimage} ${activeImage === index ? styles.active : ''}`}
          >
            <PrismicNextImage field={item.image} />
          </div>
        ))}
    </div>
  );
}

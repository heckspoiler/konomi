import React, { Dispatch, SetStateAction } from 'react';

import styles from './EventImage.module.css';
import { PrismicNextImage } from '@prismicio/next';
import { GroupField, ImageFieldImage } from '@prismicio/client';
import {
  EventDocumentDataGalleryItem,
  Simplify,
} from '../../../../../prismicio-types';

import Arrow from '@/app/components/arrow/Arrow';

export default function EventImage({
  image,
  images,
  setOverlayIsOpen,
  activeImage,
  setActiveImage,
}: {
  image: ImageFieldImage;
  images?: GroupField<Simplify<EventDocumentDataGalleryItem>>;
  setOverlayIsOpen?: Dispatch<SetStateAction<boolean>>;
  activeImage?: number;
  setActiveImage?: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className={styles.container}>
      <div
        className={styles.imageContainer}
        onClick={() => setOverlayIsOpen && setOverlayIsOpen(true)}
      >
        <PrismicNextImage
          field={
            images?.length && activeImage !== undefined ? images[activeImage].image : image
          }
        />
      </div>

      <div>
        {images && images.length > 0 && (
          <div>
            <div className={styles.arrowcontainer}>
              <div
                className={styles.arrowcontainerOne}
                onClick={() =>
                  activeImage !== undefined && activeImage > 0
                    ? setActiveImage && setActiveImage(activeImage - 1)
                    : setActiveImage && setActiveImage(images.length - 1)
                }
              >
                <Arrow height="18" width="18" />
              </div>
              <div
                className={styles.arrowcontainerTwo}
                onClick={() =>
                  activeImage !== undefined && activeImage < images.length - 1
                    ? setActiveImage && setActiveImage(activeImage + 1)
                    : setActiveImage && setActiveImage(0)
                }
              >
                <Arrow height="18" width="18" />
              </div>
            </div>
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
          </div>
        )}
      </div>
    </div>
  );
}

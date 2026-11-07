'use client';

import React, { Dispatch, SetStateAction } from 'react';

import styles from './EventImage.module.css';
import { PrismicNextImage } from '@prismicio/next';
import { GroupField, ImageFieldImage } from '@prismicio/client';
import { EventDocumentDataGalleryItem, Simplify } from '@/prismicio-types';

import Gallery from './Gallery';
import SkipArrow from './SkipArrow';

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
  isMobile?: boolean;
}) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`unstyled-button ${styles.imageContainer}`}
        onClick={() => setOverlayIsOpen?.(true)}
        aria-label="Bild vergrössern"
      >
        <PrismicNextImage
          field={
            images?.length && activeImage !== undefined
              ? images[activeImage].image
              : image
          }
        />
      </button>

      <div>
        {images && images.length > 1 && (
          <div>
            <div className={styles.arrowcontainer}>
              <SkipArrow
                onClick={() =>
                  setActiveImage?.((prev) =>
                    prev > 0 ? prev - 1 : images.length - 1,
                  )
                }
                className={styles.arrowcontainerOne}
              />
              <SkipArrow
                onClick={() =>
                  setActiveImage?.((prev) =>
                    prev < images.length - 1 ? prev + 1 : 0,
                  )
                }
                className={styles.arrowcontainerTwo}
              />
            </div>
            <Gallery
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              images={images}
            />
          </div>
        )}
      </div>
    </div>
  );
}

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
      <div
        className={styles.imageContainer}
        onClick={() => setOverlayIsOpen && setOverlayIsOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOverlayIsOpen?.(true); }}
        role="button"
        tabIndex={0}
      >
        <PrismicNextImage
          field={
            images?.length && activeImage !== undefined
              ? images[activeImage].image
              : image
          }
        />
      </div>

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

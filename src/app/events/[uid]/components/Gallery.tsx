import { GroupField } from '@prismicio/client';
import React, { Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { EventDocumentDataGalleryItem, Simplify } from '@/prismicio-types';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (activeImage === undefined || !containerRef.current) return;

    const activeElement = imageRefs.current[activeImage];
    if (!activeElement) return;

    activeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeImage]);

  return (
    <div className={styles.gallerycontainer} ref={containerRef}>
      {images &&
        images.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            onClick={() => setActiveImage && setActiveImage(index)}
            className={`${styles.galleryimage} ${activeImage === index ? styles.active : ''}`}
          >
            <PrismicNextImage field={item.image} />
          </div>
        ))}
    </div>
  );
}

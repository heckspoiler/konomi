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
    const container = containerRef.current;
    if (!activeElement || !container) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();
    const scrollLeft =
      container.scrollLeft +
      (elementRect.left - containerRect.left) -
      (containerRect.width - elementRect.width) / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }, [activeImage]);

  return (
    <div className={styles.gallerycontainer} ref={containerRef}>
      {images &&
        images.map((item, index) => (
          <div
            key={item.image.url || `gallery-${index}`}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            onClick={() => setActiveImage && setActiveImage(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveImage?.(index);
            }}
            role="button"
            tabIndex={0}
            className={`${styles.galleryimage} ${activeImage === index ? styles.active : ''}`}
          >
            <PrismicNextImage
              field={item.image}
              loading="lazy"
              sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 400px"
              imgixParams={{ q: 65, w: 400 }}
            />
          </div>
        ))}
    </div>
  );
}

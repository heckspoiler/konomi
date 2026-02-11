'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GalleryDocument } from '@/prismicio-types';
import { PrismicRichText, SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import { Content } from '@prismicio/client';

import TitleContainer from '@/app/news/components/TitleContainer';

import PageContainer from '@/app/components/PageContainer/PageContainer';

import styles from './GalleryContent.module.css';
import { isFilled } from '@prismicio/client';
import OverlayImage from '@/app/events/[uid]/components/OverlayImage';
import Cross from '@/app/events/[uid]/components/Cross';
import SkipArrow from '@/app/events/[uid]/components/SkipArrow';

type GalleryContentProps = {
  page: GalleryDocument;
};

const INITIAL_SLICE_COUNT = 1;
const SLICES_PER_BATCH = 1;

export default function GalleryContent({ page }: GalleryContentProps) {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [activeImages, setActiveImages] = useState<
    Content.GallerySlice['primary']['images']
  >([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SLICE_COUNT);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const allSlices = page.data.slices;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + SLICES_PER_BATCH, allSlices.length),
          );
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [allSlices.length]);

  const onClick = (
    images: Content.GallerySlice['primary']['images'],
    imageIndex: number,
  ) => {
    setActiveImages(images);
    setOverlayIsOpen(true);
    setActiveImage(imageIndex);
  };

  return (
    <PageContainer>
      <div className={styles.content}>
        <TitleContainer page={page} />
        {isFilled.richText(page.data.description) && (
          <PrismicRichText field={page.data.description} />
        )}
        <SliceZone
          slices={allSlices.slice(0, visibleCount)}
          components={components}
          context={{ onClick: onClick }}
        />
        {visibleCount < allSlices.length && (
          <div ref={sentinelRef} style={{ height: '1px' }} />
        )}
      </div>
      <div
        className={`${styles.overlayImageContainer} ${overlayIsOpen ? styles.isOpen : ''}`}
      >
        <Cross onClick={() => setOverlayIsOpen(false)} />
        <OverlayImage activeImage={activeImage} images={activeImages} />
        {activeImages.length > 0 && (
          <>
            <SkipArrow
              onClick={() =>
                activeImage > 0
                  ? setActiveImage(activeImage - 1)
                  : setActiveImage(activeImages.length - 1)
              }
              className={styles.arrowcontainerOne}
            />
            <SkipArrow
              onClick={() =>
                activeImage < activeImages.length - 1
                  ? setActiveImage(activeImage + 1)
                  : setActiveImage(0)
              }
              className={styles.arrowcontainerTwo}
            />
          </>
        )}
      </div>
    </PageContainer>
  );
}

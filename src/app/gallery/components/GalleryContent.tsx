'use client';

import React, { useState } from 'react';
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

export default function GalleryContent({ page }: GalleryContentProps) {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [activeImages, setActiveImages] = useState<
    Content.GallerySlice['primary']['images']
  >([]);

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
          slices={page.data.slices}
          components={components}
          context={{ onClick: onClick }}
        />
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

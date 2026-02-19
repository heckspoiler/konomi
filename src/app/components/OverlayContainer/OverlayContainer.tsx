import React from 'react';

import styles from './OverlayContainer.module.css';
import OverlayImage from '@/app/events/[uid]/components/OverlayImage';
import Cross from '@/app/events/[uid]/components/Cross';
import SkipArrow from '@/app/events/[uid]/components/SkipArrow';
import {
  EventDocument,
  EventDocumentData,
  NewsarticleDocument,
  NewsarticleDocumentData,
  Simplify,
} from '@/prismicio-types';

type OverlayContainerProps = {
  overlayIsOpen: boolean;
  setOverlayIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeImage: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  data: Simplify<EventDocumentData> | Simplify<NewsarticleDocumentData>;
  page: EventDocument | NewsarticleDocument;
};

export default function OverlayContainer({
  overlayIsOpen,
  setOverlayIsOpen,
  activeImage,
  setActiveImage,
  data,
  page,
}: OverlayContainerProps) {
  return (
    <div
      className={`${styles.overlayImageContainer} ${overlayIsOpen ? styles.isOpen : ''}`}
    >
      <Cross onClick={() => setOverlayIsOpen(false)} />
      <OverlayImage
        image={'event_image' in data ? data.event_image : data.hero_image}
        activeImage={activeImage}
        images={data.gallery}
      />{' '}
      {data.gallery.length > 1 && (
        <>
          <SkipArrow
            onClick={() =>
              setActiveImage((prev) =>
                prev > 0 ? prev - 1 : page.data.gallery.length - 1,
              )
            }
            className={styles.arrowcontainerOne}
          />
          <SkipArrow
            onClick={() =>
              setActiveImage((prev) =>
                prev < page.data.gallery.length - 1 ? prev + 1 : 0,
              )
            }
            className={styles.arrowcontainerTwo}
          />
        </>
      )}
    </div>
  );
}

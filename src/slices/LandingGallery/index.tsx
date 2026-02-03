'use client';

import { FC } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import useEmblaCarousel from 'embla-carousel-react';

import styles from './LandingGallery.module.css';
import SkipArrow from '@/app/events/[uid]/components/SkipArrow';
import Link from 'next/link';

/**
 * Props for `LandingGallery`.
 */
export type LandingGalleryProps =
  SliceComponentProps<Content.LandingGallerySlice>;

/**
 * Component for "LandingGallery" Slices.
 */
const LandingGallery: FC<LandingGalleryProps> = ({ slice }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.embla__viewport}
      ref={emblaRef}
    >
      <div className={styles.embla__container}>
        {slice.primary.gallery.map((item, index) => (
          <div key={index} className={`${styles.image} ${styles.embla__slide}`}>
            {isFilled.link(item.link) ? (
              <PrismicNextLink field={item.link}>
                <PrismicNextImage field={item.item} />
              </PrismicNextLink>
            ) : (
              <Link href="/gallery">
                <PrismicNextImage field={item.item} />
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className={styles.buttonbar}>
        <SkipArrow onClick={goToPrev} />
        <SkipArrow onClick={goToNext} />
      </div>
    </section>
  );
};

export default LandingGallery;

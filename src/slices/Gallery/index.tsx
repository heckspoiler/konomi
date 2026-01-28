import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import styles from './index.module.css';
import { PrismicNextImage } from '@prismicio/next';

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
type GalleryContext = {
  onClick?: (
    images: Content.GallerySlice['primary']['images'],
    imageIndex: number,
  ) => void;
};

const Gallery = ({
  slice,
  context,
}: {
  slice: Content.GallerySlice;
  context?: GalleryContext;
}) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.yearcontainer}
    >
      <PrismicRichText field={slice.primary.year} />
      <div className={styles.gallery}>
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            field={item.image}
            key={index}
            onClick={() => context?.onClick?.(slice.primary.images, index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;

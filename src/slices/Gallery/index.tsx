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
      <div className={styles.year}>
        <PrismicRichText field={slice.primary.year} />
      </div>
      <div className={styles.gallery}>
        {slice.primary.images.map((item, index) => (
          <button
            type="button"
            key={item.image.url || `gallery-${index}`}
            className={`unstyled-button ${styles.imageButton}`}
            onClick={() => context?.onClick?.(slice.primary.images, index)}
            aria-label={`Bild ${index + 1} vergrössern`}
          >
            <PrismicNextImage
              field={item.image}
              loading="lazy"
              sizes="(max-width: 768px) 45vw, (max-width: 1080px) 30vw, 400px"
              imgixParams={{ q: 65, w: 400 }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

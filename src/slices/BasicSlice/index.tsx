import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import styles from './BasicSlice.module.css';

import { PrismicRichText } from '@prismicio/react';

/**
 * Props for `BasicSlice`.
 */
export type BasicSliceProps = SliceComponentProps<Content.BasicSliceSlice>;

/**
 * Component for "BasicSlice" Slices.
 */
const BasicSlice = ({ slice }: BasicSliceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.basicSlice}
    >
      {slice.variation === 'default' && (
        <div className={styles.sliceContainer}>
          <div className={styles.headingContainer}>
            <PrismicRichText field={slice.primary.heading} />
            <div className={styles.subtitleContainer}>
              <PrismicRichText field={slice.primary.japanese_subtitle_first} />
              <PrismicRichText
                field={slice.primary.japanese_subtitles_second}
              />
            </div>
          </div>

          <PrismicRichText field={slice.primary.text} />
        </div>
      )}
      {slice.variation === 'schedule' && (
        <div className={styles.sliceContainer}>
          <div className={styles.headingContainer}>
            <PrismicRichText field={slice.primary.heading} />
            <div className={styles.subtitleContainer}>
              <PrismicRichText field={slice.primary.japanese_subtitles_first} />
              <PrismicRichText field={slice.primary.japanese_subtitle_second} />
            </div>
          </div>
          <PrismicRichText field={slice.primary.text} />
        </div>
      )}
    </section>
  );
};

export default BasicSlice;

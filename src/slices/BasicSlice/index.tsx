import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import styles from './BasicSlice.module.css';

import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';

import Arrow from '@/app/components/arrow/Arrow';

/**
 * Props for `BasicSlice`.
 */
export type BasicSliceProps = SliceComponentProps<Content.BasicSliceSlice>;

/**
 * Component for "BasicSlice" Slices.
 */
const BasicSlice = ({ slice }: BasicSliceProps): JSX.Element => {
  return (
    <>
      {slice.variation === 'default' && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className={styles.sliceContainer}>
            <div className={styles.upperContainer}>
              <div className={styles.headingContainer}>
                <PrismicRichText field={slice.primary.heading} />
                <div className={styles.subtitleContainer}>
                  <PrismicRichText
                    field={slice.primary.japanese_subtitle_first}
                  />
                  <PrismicRichText
                    field={slice.primary.japanese_subtitles_second}
                  />
                </div>
              </div>

              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
        </section>
      )}

      {slice.variation === 'schedule' && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className={styles.sliceContainer}>
            <div className={styles.upperContainer}>
              <div className={styles.headingContainer}>
                <PrismicRichText field={slice.primary.heading} />
                <div className={styles.subtitleContainer}>
                  <PrismicRichText
                    field={slice.primary.japanese_subtitles_first}
                  />
                  <PrismicRichText
                    field={slice.primary.japanese_subtitle_second}
                  />
                </div>
              </div>
              <PrismicRichText field={slice.primary.text} />
            </div>
          </div>
        </section>
      )}

      {slice.variation === 'whoIsKonomi' && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className={styles.sliceContainer}>
            <div className={styles.upperContainer}>
              <div className={styles.headingContainer}>
                <PrismicRichText field={slice.primary.heading} />
                <div className={styles.subtitleContainer}>
                  <PrismicRichText
                    field={slice.primary.japanese_subtitles_first}
                  />
                  <PrismicRichText
                    field={slice.primary.japanese_subtitles_second}
                  />
                </div>
              </div>
              <PrismicRichText field={slice.primary.text} />
            </div>
            <div className={styles.writtenlinkContainer}>
              <PrismicNextLink field={slice.primary.memberpage_link} />
              <Arrow height={'15'} width={'14'} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BasicSlice;

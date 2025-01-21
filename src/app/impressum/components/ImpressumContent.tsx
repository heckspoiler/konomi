import React from 'react';

import styles from './ImpressumContent.module.css';
import { PrismicRichText } from '@prismicio/react';

export default function ImpressumContent({ content }: { content: any }) {
  console.log(content.impressum_content);
  return (
    <div className={styles.container}>
      <PrismicRichText field={content.page_title} />
      <div className={styles.contentContainer}>
        {content.impressum_content &&
          content.impressum_content.map((item: any, index: number) => (
            <div key={index} className={styles.event}>
              <PrismicRichText field={item.subtitle} />
              <PrismicRichText field={item.text} />
            </div>
          ))}
      </div>
    </div>
  );
}

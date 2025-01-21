import React from 'react';

import styles from './ImpressumContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import MainHeading from '@/app/events/components/MainHeading';

export default function ImpressumContent({ page }: { page: any }) {
  const content = page.data;
  console.log(content);
  return (
    <div className={styles.container}>
      <MainHeading page={page} />
      <div className={styles.contentContainer}>
        {content.impressum_content &&
          content.impressum_content.map((item: any, index: number) => (
            <div key={index} className={styles.event}>
              <PrismicRichText field={item.subtitle} />
              <div className={styles.text}>
                <PrismicRichText field={item.text} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

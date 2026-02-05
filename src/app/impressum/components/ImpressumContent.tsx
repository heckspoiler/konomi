import React from 'react';

import styles from './ImpressumContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import { ImpressumDocument } from '@/prismicio-types';
import PageContainer from '@/app/components/PageContainer/PageContainer';
import TitleContainer from '@/app/news/components/TitleContainer';

export default function ImpressumContent({
  page,
}: {
  page: ImpressumDocument;
}) {
  const content = page.data;

  return (
    <PageContainer>
      <TitleContainer page={page} />
      <div className={styles.contentContainer}>
        {content.impressum_content &&
          content.impressum_content.map((item, index) => (
            <div key={index} className={styles.event}>
              <PrismicRichText field={item.subtitle} />
              <div className={styles.text}>
                <PrismicRichText field={item.text} />
              </div>
            </div>
          ))}
      </div>
    </PageContainer>
  );
}

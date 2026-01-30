'use client';

import React, { useState } from 'react';

import styles from './AboutContent.module.css';
import MainHeading from '@/app/events/components/MainHeading';

import { PrismicNextLink } from '@prismicio/next';
import Arrow from '@/app/components/arrow/Arrow';
import {
  AboutDocument,
  AboutDocumentDataKonomiMemberItem,
} from '../../../../prismicio-types';
import PageContainer from '@/app/components/PageContainer/PageContainer';
import { PrismicRichText } from '@prismicio/react';

export default function AboutContent({ page }: { page: AboutDocument }) {
  const data = page.data;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <PageContainer>
      <MainHeading page={page} />
      <div className={styles.aboutContainer}>
        <PrismicRichText field={page.data.description} />
      </div>

      <div className={styles.membersContainer}>
        {data.konomi_member.map(
          (item: AboutDocumentDataKonomiMemberItem, index: number) => (
            <div
              key={index}
              className={styles.member}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <PrismicNextLink field={item.konomi_member_link} />
              <Arrow
                fill={hoveredIndex === index ? 'var(--red)' : 'var(--beige)'}
              />
            </div>
          ),
        )}
      </div>
      <div className={styles.whykonomi}>
        <PrismicRichText field={page.data.why_konomi} />
        <PrismicRichText field={page.data.why_description} />
        <PrismicRichText field={page.data.konomi_means_taste} />
      </div>
    </PageContainer>
  );
}

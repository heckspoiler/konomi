'use client';

import React, { useEffect, useState } from 'react';

import styles from './AboutContent.module.css';
import MainHeading from '@/app/events/components/MainHeading';

import { PrismicNextLink } from '@prismicio/next';
import Arrow from '@/app/components/arrow/Arrow';
import {
  AboutDocument,
  AboutDocumentDataKonomiMemberItem,
} from '../../../../prismicio-types';

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
    <div className={styles.container}>
      <MainHeading page={page} />
      <div className={styles.aboutContainer}>
        <p>{data.about_description}</p>
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
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

import styles from './AboutContent.module.css';
import MainHeading from '@/app/events/components/MainHeading';
import { PrismicRichText } from '@prismicio/react';

import { PrismicNextLink } from '@prismicio/next';
import Arrow from '@/app/components/arrow/Arrow';

export default function AboutContent({ page }: { page: any }) {
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
        {data.konomi_member.map((item: any, index: number) => (
          <div
            key={index}
            className={styles.member}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <PrismicNextLink field={item.konomi_member_link} />
            <Arrow
              fill={hoveredIndex === index ? 'var(--dark-blue)' : 'white'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

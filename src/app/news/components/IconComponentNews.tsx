'use client';

import React from 'react';
import styles from './IconComponentNews.module.css';
import Image from 'next/image';
import Book from '@public/svg/book_red.svg';
import Vinyl from '@public/svg/vinyl_red.svg';
import Drink from '@public/svg/drinks_red.svg';
import Food from '@public/svg/food_red.svg';
import Craft from '@public/svg/hammer_red.svg';
import Art from '@public/svg/brush_red.svg';
import { NewsarticleDocument } from '../../../../prismicio-types';

const iconMap: Record<string, { src: typeof Book; alt: string }> = {
  drinks: { src: Drink, alt: 'drink' },
  food: { src: Food, alt: 'food' },
  music: { src: Vinyl, alt: 'music' },
  lecture: { src: Book, alt: 'lecture' },
  craft: { src: Craft, alt: 'craft' },
  art: { src: Art, alt: 'art' },
};

function renderIcon(property: string) {
  const icon = iconMap[property];
  if (!icon) return null;
  return <Image src={icon.src} alt={icon.alt} height={42} width={42} />;
}

export default function IconComponentNews({
  page,
  height,
  width,
}: {
  page: NewsarticleDocument;
  height?: string;
  width?: string;
}) {
  return (
    <div className={styles.iconContainer}>
      {page?.data.tags.map((prop, index) => {
        const icon = renderIcon(prop.item as string);
        return (
          icon && (
            <div
              key={index}
              className={styles.icon}
              style={{ height: height && height, width: width && width }}
            >
              {icon}
            </div>
          )
        );
      })}
    </div>
  );
}

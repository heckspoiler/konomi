'use client';

import React from 'react';
import styles from './IconComponent.module.css';
import Book from '@public/svg/book_red.svg';
import Image from 'next/image';
import Vinyl from '@public/svg/vinyl_red.svg';
import Drink from '@public/svg/drinks_red.svg';
import Food from '@public/svg/food_red.svg';
import Craft from '@public/svg/hammer_red.svg';
import Art from '@public/svg/brush_red.svg';
import { EventDocument } from '@/prismicio-types';

function renderIcon(property: string, value: boolean) {
  if (!value) return null;

  switch (property) {
    case 'is_drinks':
      return <Image src={Drink} alt="drink" height={55} width={55} />;
    case 'is_food':
      return <Image src={Food} alt="food" height={55} width={55} />;
    case 'is_music':
      return <Image src={Vinyl} alt="music" height={55} width={55} />;
    case 'is_lecture':
      return <Image src={Book} alt="lecture" height={55} width={55} />;
    case 'is_crafting':
      return <Image src={Craft} alt="craft" height={55} width={55} />;
    case 'is_art':
      return <Image src={Art} alt="art" height={55} width={55} />;
    default:
      return null;
  }
}

export default function IconComponent({ event }: { event: EventDocument }) {
  const iconProperties = [
    { key: 'is_drinks', value: event.data.is_drinks },
    { key: 'is_food', value: event.data.is_food },
    { key: 'is_music', value: event.data.is_music },
    { key: 'is_lecture', value: event.data.is_lecture },
    { key: 'is_crafting', value: event.data.is_crafting },
    { key: 'is_art', value: event.data.is_art },
  ];

  return (
    <div className={styles.iconContainer}>
      {iconProperties.map((prop, index) => {
        const icon = renderIcon(prop.key, prop.value);
        return (
          icon && (
            <div key={index} className={styles.icon}>
              {icon}
            </div>
          )
        );
      })}
    </div>
  );
}

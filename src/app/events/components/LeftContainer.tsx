'use client';

import React from 'react';
import styles from './LeftContainer.module.css';
import Book from '../../../../public/svg/book.svg';
import Image from 'next/image';
import Vinyl from '../../../../public/svg/vinyl.svg';
import Drink from '../../../../public/svg/drink.svg';
import Food from '../../../../public/svg/food.svg';
import Link from 'next/link';

function renderIcon(property: string, value: boolean) {
  if (!value) return null;

  switch (property) {
    case 'is_drinks':
      return <Image src={Drink} alt="drink" height={60} width={60} />;
    case 'is_food':
      return <Image src={Food} alt="food" height={60} width={60} />;
    case 'is_music':
      return <Image src={Vinyl} alt="music" height={60} width={60} />;
    case 'is_lecture':
      return <Image src={Book} alt="lecture" height={60} width={60} />;
    default:
      return null;
  }
}

export default function LeftContainer({ event }: { event: any }) {
  const iconProperties = [
    { key: 'is_drinks', value: event.data.is_drinks },
    { key: 'is_food', value: event.data.is_food },
    { key: 'is_music', value: event.data.is_music },
    { key: 'is_lecture', value: event.data.is_lecture },
  ];

  return (
    <div className={styles.leftContainer}>
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
      <div className={styles.linkContainer}>
        <Link href={event.url}>Zum Event</Link>
      </div>
    </div>
  );
}

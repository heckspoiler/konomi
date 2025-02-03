'use client';

import React from 'react';
import styles from './LeftContainer.module.css';
import Book from '../../../../public/svg/book.svg';
import Image from 'next/image';
import Vinyl from '../../../../public/svg/vinyl.svg';
import Drink from '../../../../public/svg/drink.svg';
import Food from '../../../../public/svg/food.svg';
import Craft from '../../../../public/svg/sword.svg';

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
    case 'is_crafting':
      return <Image src={Craft} alt="lecture" height={55} width={55} />;
    default:
      return null;
  }
}

export default function IconComponent({
  event,
  singleEventStyles,
}: {
  event: any;
  singleEventStyles?: any;
}) {
  const iconProperties = [
    { key: 'is_drinks', value: event.data.is_drinks },
    { key: 'is_food', value: event.data.is_food },
    { key: 'is_music', value: event.data.is_music },
    { key: 'is_lecture', value: event.data.is_lecture },
    { key: 'is_crafting', value: event.data.is_crafting },
  ];

  return (
    <div
      className={
        singleEventStyles
          ? singleEventStyles.iconContainer
          : styles.iconContainer
      }
    >
      {iconProperties.map((prop, index) => {
        const icon = renderIcon(prop.key, prop.value);
        return (
          icon && (
            <div
              key={index}
              className={
                singleEventStyles ? singleEventStyles.icon : styles.icon
              }
            >
              {icon}
            </div>
          )
        );
      })}
    </div>
  );
}

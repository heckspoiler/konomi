'use client';

import React, { useState, useEffect, use } from 'react';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import Link from 'next/link';

import { closeMenu } from '../../../../../../helpers/closeMenu';
import { CloseMenuProps } from '../../../../../../helpers/closeMenu';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { PrismicRichText } from '@prismicio/react';
import Arrow from '@/app/components/arrow/Arrow';

export default function Navbar({
  content,
  menuIsOpen,
  setMenuIsOpen,
  hero,
}: {
  content: any;
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hero: any;
}) {
  const [isActiveItem, setIsActiveItem] = useState();

  const pathname = usePathname();

  useEffect(() => {
    content.navigation_items.forEach((item: any) => {
      if (
        item.navigation_item.url &&
        pathname &&
        pathname.startsWith(item.navigation_item.url)
      ) {
        setIsActiveItem(item);
      }
    });
  }, [pathname]);

  console.log(hero.data.hero_image.url);

  return (
    <nav className={`${styles.navbar} ${menuIsOpen ? styles.open : ''}`}>
      <div className={styles.clickables}>
        <div className={styles.list}>
          {content.navigation_items.map((item: any, index: number) => (
            <li
              key={index}
              className={`${styles.item} ${isActiveItem === item ? styles.active : ''}`}
              onClick={() => {
                closeMenu({ setMenuIsOpen });
              }}
            >
              <div className={styles.itemContent}>
                <PrismicNextLink field={item.navigation_item} />
                <PrismicNextImage field={item.navigation_active_image} />
              </div>
            </li>
          ))}
        </div>
        <div className={styles.socials}>
          {content.navigation_social_icons.map((item: any, index: number) => (
            <div key={index} onClick={() => closeMenu({ setMenuIsOpen })}>
              <Link href={item.socials_link.url ?? '/#about'}>
                <PrismicNextImage field={item.socials_icon} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div className={styles.address}>
          {content.navigation_address.map((item: any, index: number) => (
            <div key={index}>
              <PrismicRichText field={item.address_line} />
            </div>
          ))}
        </div>
        <div
          className={styles.impressum}
          onClick={() => {
            closeMenu({ setMenuIsOpen });
          }}
        >
          <PrismicNextLink field={content.impressum_link}>
            <p>{content.impressum_link.text}</p>
            <Arrow fill="var(--beige)" height="10" width="9" />
          </PrismicNextLink>
        </div>
      </div>
    </nav>
  );
}

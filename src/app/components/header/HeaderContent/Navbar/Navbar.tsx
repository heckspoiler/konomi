import React from 'react';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import Link from 'next/link';

import styles from './Navbar.module.css';
import { PrismicRichText } from '@prismicio/react';

export default function Navbar({
  content,
  menuIsOpen,
  setMenuIsOpen,
}: {
  content: any;
  menuIsOpen: boolean;
  setMenuIsOpen: (menuIsOpen: boolean) => void;
}) {
  const clickFunction = () => {
    setMenuIsOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${menuIsOpen ? styles.open : ''}`}>
      <div className={styles.clickables}>
        <div className={styles.list}>
          {content.navigation_items.map((item: any, index: number) => (
            <li
              key={index}
              className={styles.item}
              onClick={() => {
                clickFunction();
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
            <div key={index}>
              <Link href={item.socials_link.url ?? ''}>
                <PrismicNextImage field={item.socials_icon} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.address}>
        {content.navigation_address.map((item: any, index: number) => (
          <div key={index}>
            <PrismicRichText field={item.address_line} />
          </div>
        ))}
      </div>
    </nav>
  );
}

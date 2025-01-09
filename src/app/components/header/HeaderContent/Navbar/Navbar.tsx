import React from 'react';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import Link from 'next/link';

import styles from './Navbar.module.css';
import { PrismicRichText } from '@prismicio/react';

export default function Navbar({
  content,
  menuIsOpen,
}: {
  content: any;
  menuIsOpen: boolean;
}) {
  console.log(content.navigation_items.navigation_item);

  return (
    <nav className={`${styles.navbar} ${menuIsOpen ? styles.open : ''}`}>
      <div className={styles.list}>
        {content.navigation_items.map((item: any, index: number) => (
          <li key={index} className={styles.item}>
            <Link href={item.navigation_item.url ?? ''}>
              <h5>{item.navigation_item.text}</h5>
              <PrismicNextImage field={item.navigation_active_image} />
            </Link>
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
      <div className={styles.address}>
        {content.navigation_address.map((item: any, index: number) => (
          <PrismicRichText field={item.address_line} />
        ))}
      </div>
    </nav>
  );
}

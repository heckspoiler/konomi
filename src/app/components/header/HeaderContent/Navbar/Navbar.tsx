'use client';

import React, { useState, useEffect } from 'react';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import Link from 'next/link';

import { closeMenu } from '../../../../../../helpers/closeMenu';

import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { PrismicRichText } from '@prismicio/react';
import Arrow from '@/app/components/arrow/Arrow';
import {
  SettingsDocumentData,
  SettingsDocumentDataNavigationAddressItem,
  SettingsDocumentDataNavigationItemsItem,
  SettingsDocumentDataNavigationSocialIconsItem,
  Simplify,
} from '@/prismicio-types';

export default function Navbar({
  content,
  menuIsOpen,
  setMenuIsOpen,
}: {
  content: Simplify<SettingsDocumentData>;
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isActiveItem, setIsActiveItem] =
    useState<Simplify<SettingsDocumentDataNavigationItemsItem>>();

  const pathname = usePathname();

  useEffect(() => {
    content.navigation_items.forEach(
      (item: Simplify<SettingsDocumentDataNavigationItemsItem>) => {
        if (
          'url' in item.navigation_item &&
          item.navigation_item.url &&
          pathname &&
          pathname.startsWith(item.navigation_item.url)
        ) {
          setIsActiveItem(item);
        }
      },
    );
  }, [pathname, content.navigation_items]);

  return (
    <nav className={`${styles.navbar} ${menuIsOpen ? styles.open : ''}`}>
      <div className={styles.clickables}>
        <div className={styles.list}>
          {content.navigation_items.map(
            (
              item: Simplify<SettingsDocumentDataNavigationItemsItem>,
              index: number,
            ) => (
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
            ),
          )}
        </div>
        <div className={styles.socials}>
          {content.navigation_social_icons.map(
            (
              item: Simplify<SettingsDocumentDataNavigationSocialIconsItem>,
              index: number,
            ) => (
              <div key={index} onClick={() => closeMenu({ setMenuIsOpen })}>
                <Link
                  href={
                    ('url' in item.socials_link && item.socials_link.url) ||
                    'mailto:tickets@konomi.ch'
                  }
                >
                  <PrismicNextImage field={item.socials_icon} />
                </Link>
              </div>
            ),
          )}
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div className={styles.address}>
          {content.navigation_address.map(
            (
              item: Simplify<SettingsDocumentDataNavigationAddressItem>,
              index: number,
            ) => (
              <div key={index}>
                <PrismicRichText field={item.address_line} />
              </div>
            ),
          )}
        </div>
        <div
          className={styles.impressum}
          onClick={() => {
            closeMenu({ setMenuIsOpen });
          }}
        >
          <div className={styles.impressumContent}>
            <PrismicNextLink field={content.impressum_link}>
              <p>{content.impressum_link.text}</p>
              <Arrow fill="var(--red)" height="10" width="9" />
            </PrismicNextLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

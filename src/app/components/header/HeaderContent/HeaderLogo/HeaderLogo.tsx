'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { PrismicRichText } from '@prismicio/react';
import styles from './HeaderLogo.module.css';
import { usePathname } from 'next/navigation';
import { closeMenu } from '../../../../../../helpers/closeMenu';

const pathnames = ['/about', '/events', '/archive', '/contact'];

export default function HeaderLogo({
  content,
  menuIsOpen,
  setMenuIsOpen,
}: {
  content: any;
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const titleRef = useRef<HTMLDivElement>(null);
  const isNotHomePage = pathnames.some((path) => pathname.includes(path));

  return (
    <div
      className={`${styles.logoContainer} ${menuIsOpen ? styles.open : ''} ${isNotHomePage ? styles.notHomepage : ''}`}
      ref={titleRef}
      onClick={() => {
        closeMenu({ setMenuIsOpen });
      }}
    >
      <Link href="/">
        <PrismicRichText field={content.page_title} />
        <PrismicRichText field={content.page_subtitle_date} />
      </Link>
    </div>
  );
}

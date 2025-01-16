'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PrismicRichText } from '@prismicio/react';
import styles from './HeaderLogo.module.css';
import { usePathname } from 'next/navigation';
import { closeMenu } from '../../../../../../helpers/closeMenu';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

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

  useGSAP(() => {
    const titleElement = titleRef.current;

    if (titleElement) {
      gsap.to(titleElement, {
        scale: isNotHomePage ? '0.7' : '1',
        rotateX: isNotHomePage ? 360 : 0,
        backfaceVisibility: 'visible',
        duration: 0.4,
        ease: 'power1.inOut',
      });
    }
  }, [pathname]);

  return (
    <div
      className={styles.logoContainer}
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

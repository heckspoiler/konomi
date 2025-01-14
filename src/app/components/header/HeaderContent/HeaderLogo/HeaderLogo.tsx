'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PrismicRichText } from '@prismicio/react';
import styles from './HeaderLogo.module.css';
import { usePathname } from 'next/navigation';

const pathnames = ['/about', '/events'];

export default function HeaderLogo({ content }: { content: any }) {
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const isNotHomePage = pathnames.some((path) => pathname.includes(path));
    setTimeout(() => {
      setIsHome(!isNotHomePage);
    }, 500);
  }, [pathname]);

  return (
    <div
      className={`${styles.logoContainer} ${!isHome ? styles.smallHeader : ''}`}
    >
      <Link href="/">
        <PrismicRichText field={content.page_title} />
        <PrismicRichText field={content.page_subtitle_date} />
      </Link>
    </div>
  );
}

import Link from 'next/link';
import React from 'react';

import styles from './BackToComponent.module.css';

export default function BackToComponent({
  text,
  url,
}: {
  text: string;
  url: string;
}) {
  return (
    <div className={styles.backToContainer}>
      <Link href={url}>{text}</Link>
    </div>
  );
}

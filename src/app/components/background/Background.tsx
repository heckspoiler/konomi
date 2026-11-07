'use client';

import dynamic from 'next/dynamic';

import styles from './Background.module.css';

const BackgroundCanvas = dynamic(
  () => import('./BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

export default function Background() {
  return (
    <section className={styles.main}>
      <BackgroundCanvas />
    </section>
  );
}

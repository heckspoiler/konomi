import React from 'react';

import styles from './Background.module.css';

import BackgroundCanvas from './BackgroundCanvas/BackgrounCanvas';

export default function Background() {
  return (
    <section className={styles.main}>
      <BackgroundCanvas />
    </section>
  );
}

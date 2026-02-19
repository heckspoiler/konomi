'use client';

import React from 'react';
import styles from './Splashscreen.module.css';

export default function Splashscreen() {
  const letters = 'Konomi'.split('').map((letter, i) => ({ letter, id: `${letter}-${i}`, cssIndex: i }));

  return (
    <div className={styles.main}>
      <div className={styles.letterContainer}>
        <div>
          {letters.map((item) => (
            <h1
              key={item.id}
              className={styles.letter}
              style={{ '--index': item.cssIndex } as React.CSSProperties}
            >
              {item.letter}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}

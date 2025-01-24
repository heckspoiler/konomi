'use client';

import React from 'react';
import styles from './Splashscreen.module.css';

export default function Splashscreen() {
  const letters = 'Konomi'.split('');

  return (
    <div className={styles.main}>
      <div className={styles.letterContainer}>
        <div>
          {letters.map((letter, index) => (
            <h1
              key={index}
              className={styles.letter}
              style={{ '--index': index } as React.CSSProperties}
            >
              {letter}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}

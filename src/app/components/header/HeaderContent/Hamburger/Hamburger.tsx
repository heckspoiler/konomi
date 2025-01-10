'use client';

import React from 'react';

import styles from './Hamburger.module.css';

export default function Hamburger({
  setMenuIsOpen,
  menuIsOpen,
}: {
  setMenuIsOpen: (menuIsOpen: boolean) => void;
  menuIsOpen: boolean;
}) {
  return (
    <div
      className={`${styles.hamburger} ${menuIsOpen ? styles.open : ''}`}
      onClick={() => setMenuIsOpen(!menuIsOpen)}
    >
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.backgroundCircle}></div>
    </div>
  );
}

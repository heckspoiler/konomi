'use client';

import React from 'react';

import styles from './Hamburger.module.css';
import { closeMenu } from '@helpers/closeMenu';

export default function Hamburger({
  setMenuIsOpen,
  menuIsOpen,
}: {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuIsOpen: boolean;
}) {
  return (
    <button
      type="button"
      className={`unstyled-button ${styles.hamburger} ${menuIsOpen ? styles.open : ''}`}
      onClick={() => {
        if (menuIsOpen) {
          closeMenu({ setMenuIsOpen, time: 200 });
        } else {
          setMenuIsOpen(true);
        }
      }}
      aria-label={menuIsOpen ? 'Menü schliessen' : 'Menü öffnen'}
      aria-expanded={menuIsOpen}
    >
      <span className={styles.hamburgerLine} aria-hidden="true"></span>
      <span className={styles.hamburgerLine} aria-hidden="true"></span>
      <span className={styles.hamburgerLine} aria-hidden="true"></span>
      <span className={styles.backgroundCircle} aria-hidden="true"></span>
    </button>
  );
}

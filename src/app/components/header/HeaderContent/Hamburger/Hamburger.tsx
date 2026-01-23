'use client';

import React from 'react';

import styles from './Hamburger.module.css';
import { closeMenu } from '../../../../../../helpers/closeMenu';

export default function Hamburger({
  setMenuIsOpen,
  menuIsOpen,
}: {
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuIsOpen: boolean;
}) {
  return (
    <div
      className={`${styles.hamburger} ${menuIsOpen ? styles.open : ''}`}
      onClick={() => {
        if (menuIsOpen) {
          closeMenu({ setMenuIsOpen, time: 200 });
        } else {
          setMenuIsOpen(true);
        }
      }}
    >
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.backgroundCircle}></div>
    </div>
  );
}

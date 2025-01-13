import React from 'react';

import styles from './ClickOverlay.module.css';

export default function ClickOverlay({
  isMobile,
  menuIsOpen,
  setMenuIsOpen,
}: {
  isMobile: boolean;
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${styles.clickOverlay} ${menuIsOpen && !isMobile ? styles.isVisible : ''}`}
      onClick={() => setMenuIsOpen(false)}
    ></div>
  );
}

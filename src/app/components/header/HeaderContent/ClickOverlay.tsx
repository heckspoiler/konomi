import React from 'react';

import styles from './ClickOverlay.module.css';

import { closeMenu } from '../../../../../helpers/closeMenu';

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
      onClick={() => {
        closeMenu({ setMenuIsOpen, time: 200 });
      }}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeMenu({ setMenuIsOpen, time: 200 }); }}
      role="button"
      tabIndex={0}
      aria-label="Close menu"
    ></div>
  );
}

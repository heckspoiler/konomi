import React from 'react';

import styles from './Cross.module.css';

type Props = {
  onClick: () => void;
};

export default function Cross({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`unstyled-button ${styles.cross}`}
      aria-label="Schliessen"
    >
      <span className={styles.crossContainer} aria-hidden="true">
        <span></span>
        <span></span>
      </span>
    </button>
  );
}

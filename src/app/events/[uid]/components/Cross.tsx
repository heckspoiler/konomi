import React from 'react';

import styles from './Cross.module.css';

type Props = {
  onClick: () => void;
};

export default function Cross({ onClick }: Props) {
  return (
    <div onClick={onClick} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }} role="button" tabIndex={0} className={styles.cross}>
      <div className={styles.crossContainer}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

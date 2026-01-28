import React from 'react';

import styles from './Cross.module.css';

type Props = {
  onClick: () => void;
};

export default function Cross({ onClick }: Props) {
  return (
    <div onClick={onClick} className={styles.cross}>
      <div className={styles.crossContainer}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

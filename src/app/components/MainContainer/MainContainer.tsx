import React from 'react';

import styles from './MainContainer.module.css';

type MainContainerProps = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: MainContainerProps) {
  return <div className={styles.main}>{children}</div>;
}

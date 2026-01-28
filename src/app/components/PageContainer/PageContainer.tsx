import React from 'react';

type PageContainerProps = { children: React.ReactNode };

import styles from './PageContainer.module.css';

export default function PageContainer({ children }: PageContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

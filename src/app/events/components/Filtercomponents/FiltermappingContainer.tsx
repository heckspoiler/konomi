import React from 'react';

import styles from './FiltermappingContainer.module.css';

export default function FiltermappingContainer({
  children,
}: {
  children: any;
}) {
  return <div className={styles.container}>{children}</div>;
}

import React from 'react';

import styles from './DescriptionContainer.module.css';

type DescriptionContainerProps = {
  children: React.ReactNode;
};

export default function DescriptionContainer({
  children,
}: DescriptionContainerProps) {
  return <div className={styles.descriptioncontainer}>{children}</div>;
}

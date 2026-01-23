import React from 'react';

import styles from './MainSection.module.css';

type MainSectionProps = {
  id: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
};

export default function MainSection({ id, children, ref }: MainSectionProps) {
  return (
    <div id={`${id}`} ref={ref} className={styles.section}>
      {children}
    </div>
  );
}

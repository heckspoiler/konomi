import React from 'react';

import Arrow from '@/app/components/arrow/Arrow';

import styles from './SkipArrow.module.css';

type SkipArrowProps = {
  isMobile: boolean | undefined;
  className: string;
  onClick: () => void;
};

export default function SkipArrow({
  isMobile,
  className,
  onClick,
}: SkipArrowProps) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      <Arrow height={!isMobile ? '18' : '12'} width={!isMobile ? '18' : '12'} />
    </button>
  );
}

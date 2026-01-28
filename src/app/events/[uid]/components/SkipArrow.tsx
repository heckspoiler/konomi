import React from 'react';

import Arrow from '@/app/components/arrow/Arrow';

import styles from './SkipArrow.module.css';

import { useMobile } from '../../../../../contexts/MobileContext';

type SkipArrowProps = {
  className: string;
  onClick: () => void;
};

export default function SkipArrow({ className, onClick }: SkipArrowProps) {
  const { isMobile } = useMobile();

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      <Arrow height={!isMobile ? '18' : '12'} width={!isMobile ? '18' : '12'} />
    </button>
  );
}

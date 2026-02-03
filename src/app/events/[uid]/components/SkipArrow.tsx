import React, { useState } from 'react';

import Arrow from '@/app/components/arrow/Arrow';

import styles from './SkipArrow.module.css';

type SkipArrowProps = {
  className?: string;
  onClick: () => void;
};

export default function SkipArrow({ className, onClick }: SkipArrowProps) {
  const [isHovered, setIsHovered] = useState<boolean | undefined>(false);

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Arrow
        height={'12'}
        width={'12'}
        fill={`${isHovered ? 'var(--red)' : 'var(--beige)'}`}
      />
    </button>
  );
}

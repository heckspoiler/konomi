'use client';

import React, { useState, useEffect } from 'react';

import styles from './FilterFoldout.module.css';

import Topfield from './Topfield';
import Bottomfield from './Bottomfield';

export default function FilterFoldout({ events }: { events: any }) {
  const [fieldIsOpen, setIsFieldOpen] = useState('');
  return (
    <div className={styles.foldout}>
      <Topfield fieldIsOpen={fieldIsOpen} setIsFieldOpen={setIsFieldOpen} />
      <Bottomfield events={events} fieldIsOpen={fieldIsOpen} />
    </div>
  );
}

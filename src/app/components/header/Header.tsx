import React from 'react';

import { createClient } from '@/prismicio';

import HeaderContent from './HeaderContent/HeaderContent';

import styles from './Header.module.css';

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle('settings');
  const content = settings.data;

  return (
    <header className={styles.header}>
      <HeaderContent content={content} />
    </header>
  );
}

import React from 'react';

import { createClient } from '@/prismicio';

import HeaderContent from './HeaderContent/HeaderContent';

import styles from './Header.module.css';

export default async function Header() {
  const client = createClient();
  const [settings, hero] = await Promise.all([
    client.getSingle('settings'),
    client.getSingle('hero_image'),
  ]);
  const content = settings.data;

  return (
    <header className={styles.header}>
      <HeaderContent content={content} hero={hero} />
    </header>
  );
}

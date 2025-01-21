import React from 'react';

import { createClient } from '@/prismicio';

import FooterContent from './components/FooterContent';

import styles from './Footer.module.css';

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle('footer');
  const data = settings.data;
  return (
    <footer className={styles.footer}>
      <FooterContent data={data} />
    </footer>
  );
}

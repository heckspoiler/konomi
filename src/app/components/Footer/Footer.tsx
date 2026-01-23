import React from 'react';

import { createClient } from '@/prismicio';

import FooterContent from './components/FooterContent';

import styles from './Footer.module.css';

export default async function Footer() {
  const client = createClient();
  const footer = await client.getSingle('footer');

  return (
    <footer className={styles.footer}>
      <FooterContent footer={footer} />
    </footer>
  );
}

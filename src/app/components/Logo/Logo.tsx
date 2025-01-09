import React from 'react';

import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';

import styles from './Logo.module.css';

export default async function Logo() {
  const client = createClient();
  const data = await client.getSingle('logo');

  console.log(data);

  return (
    <div className={styles.logoContainer}>
      <PrismicNextImage field={data.data.logo_image} />
    </div>
  );
}

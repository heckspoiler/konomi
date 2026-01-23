import React from 'react';

import { createClient } from '@/prismicio';

import styles from './Logo.module.css';
import LogoContent from './LogoContent/LogoContent';

export default async function Logo() {
  const client = createClient();
  const logo = await client.getSingle('logo');

  return <LogoContent logo={logo} />;
}

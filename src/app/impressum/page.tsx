import { Metadata } from 'next';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

import styles from './page.module.css';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('impressum');

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('impressum');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

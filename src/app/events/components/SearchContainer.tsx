'use client';

import React from 'react';

import styles from './SearchContainer.module.css';
import { PrismicNextImage } from '@prismicio/next';
import { SearchIconDocument } from '../../../../prismicio-types';

import { useSearchbarStore } from '../../../../stores/useSearchStore';

type SearchIconProps = {
  searchicon: SearchIconDocument;
};

export default function SearchContainer({ searchicon }: SearchIconProps) {
  const { query, setQuery } = useSearchbarStore();

  return (
    <div className={styles.searchcontainer}>
      <input
        placeholder="Suchen"
        id="eventsearch"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        suppressHydrationWarning
      />
      <PrismicNextImage field={searchicon.data.icon} />
    </div>
  );
}

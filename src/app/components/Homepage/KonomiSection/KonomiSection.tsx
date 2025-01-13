import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import { PrismicRichText, SliceZone } from '@prismicio/react';

import styles from './KonomiSection.module.css';

export default function KonomiSection({
  konomiSlice,
  components,
}: {
  konomiSlice: any;
  components: any;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={konomiSlice} components={components} />
    </SectionContainer>
  );
}

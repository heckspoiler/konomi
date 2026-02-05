import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import { SliceZone } from '@prismicio/react';
import { PageDocumentDataSlicesSlice } from '@/prismicio-types';
import type { components as SliceComponents } from '@/slices';

export default function KonomiSection({
  konomiSlice,
  components,
}: {
  konomiSlice: PageDocumentDataSlicesSlice[];
  components: typeof SliceComponents;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={konomiSlice} components={components} />
    </SectionContainer>
  );
}

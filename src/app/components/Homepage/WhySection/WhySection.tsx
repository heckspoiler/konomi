import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';
import { SliceZone } from '@prismicio/react';
import { PageDocumentDataSlicesSlice } from '@/prismicio-types';

import type { components as SliceComponents } from '@/slices';

export default function WhySection({
  whySlice,
  components,
}: {
  whySlice: PageDocumentDataSlicesSlice[];
  components: typeof SliceComponents;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={whySlice} components={components} />
    </SectionContainer>
  );
}

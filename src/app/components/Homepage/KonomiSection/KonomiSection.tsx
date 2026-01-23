import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import { SliceZone } from '@prismicio/react';
import { BasicSliceSlice } from '../../../../../prismicio-types';
import type { components as SliceComponents } from '@/slices';

export default function KonomiSection({
  konomiSlice,
  components,
}: {
  konomiSlice: BasicSliceSlice[];
  components: typeof SliceComponents;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={konomiSlice} components={components} />
    </SectionContainer>
  );
}

import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';
import { SliceZone } from '@prismicio/react';
import { BasicSliceSlice } from '../../../../../prismicio-types';

import type { components as SliceComponents } from '@/slices';

export default function WhySection({
  whySlice,
  components,
}: {
  whySlice: BasicSliceSlice[];
  components: typeof SliceComponents;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={whySlice} components={components} />
    </SectionContainer>
  );
}

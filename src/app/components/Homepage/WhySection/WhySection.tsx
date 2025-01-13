import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';
import { SliceZone } from '@prismicio/react';

export default function WhySection({
  whySlice,
  components,
}: {
  whySlice: any;
  components: any;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={whySlice} components={components} />
    </SectionContainer>
  );
}

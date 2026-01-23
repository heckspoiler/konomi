import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import { SliceZone } from '@prismicio/react';
import NewsletterForm from './NewsletterForm';
import type { components as SliceComponents } from '@/slices';
import { BasicSliceSlice } from '../../../../../prismicio-types';

export default function AboutSection({
  defaultVariationSlice,
  components,
}: {
  defaultVariationSlice: BasicSliceSlice[];
  components: typeof SliceComponents;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={defaultVariationSlice} components={components} />
      <NewsletterForm />
    </SectionContainer>
  );
}

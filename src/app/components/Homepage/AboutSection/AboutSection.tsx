import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import { SliceZone } from '@prismicio/react';
import NewsletterForm from './NewsletterForm';
import type { components as SliceComponents } from '@/slices';
import { PageDocumentDataSlicesSlice } from '../../../../../prismicio-types';

export default function AboutSection({
  defaultVariationSlice,
  components,
}: {
  defaultVariationSlice: PageDocumentDataSlicesSlice[];
  components: typeof SliceComponents;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={defaultVariationSlice} components={components} />
      <NewsletterForm />
    </SectionContainer>
  );
}

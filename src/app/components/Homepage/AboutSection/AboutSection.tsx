import React from 'react';

import SectionContainer from '../SectionContainer/SectionContainer';

import { SliceZone } from '@prismicio/react';
import NewsletterForm from './NewsletterForm';

export default function AboutSection({
  defaultVariationSlice,
  components,
}: {
  defaultVariationSlice: any;
  components: any;
}) {
  return (
    <SectionContainer>
      <SliceZone slices={defaultVariationSlice} components={components} />
      <NewsletterForm />
    </SectionContainer>
  );
}

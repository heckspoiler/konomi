import React from 'react';

import { PageDocumentDataSlicesSlice } from '../../../../../prismicio-types';

import type { components as SliceComponents } from '@/slices';
import { SliceZone } from '@prismicio/react';

type Props = {
  gallerySlice: PageDocumentDataSlicesSlice[];
  components: typeof SliceComponents;
};

export default function GallerySection({ gallerySlice, components }: Props) {
  return (
    <div>
      <SliceZone slices={gallerySlice} components={components} />
    </div>
  );
}

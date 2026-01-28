import React from 'react';
import { GalleryDocument } from '../../../../prismicio-types';
import { PrismicRichText, SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import TitleContainer from '@/app/news/components/TitleContainer';

import PageContainer from '@/app/components/PageContainer/PageContainer';

type GalleryContentProps = {
  page: GalleryDocument;
};

export default function GalleryContent({ page }: GalleryContentProps) {
  return (
    <PageContainer>
      <TitleContainer page={page} />
      <PrismicRichText field={page.data.description} />
      <SliceZone slices={page.data.slices} components={components} />
    </PageContainer>
  );
}

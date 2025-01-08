import { Metadata } from 'next';

import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? '' }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return (
    <>
      <h1>KONOMI</h1>
      <p>Konomi Text Bla bla bla bla</p>
      <button>Click me</button>
      <h4>
        {' '}
        \[ta\|be\|ru\] <br /> -- dt.: \"essen\"
      </h4>
      <section className="card">
        <h3>KONOMI</h3>
      </section>
    </>
  );
}

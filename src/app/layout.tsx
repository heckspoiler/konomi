import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import Script from 'next/script';

import { Providers } from './components/Providers/Providers';

import { createClient } from '@/prismicio';

import Background from './components/background/Background';

import Header from './components/header/Header';

import './globals.css';
import Logo from './components/Logo/Logo';

import typeface from '../../helpers/typeface';

import Footer from './components/Footer/Footer';
import Splashscreen from './components/Splashscreen/Splashscreen';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();

  const events = await client.getAllByType('event');

  const splashscreenVisible = true;

  return (
    <html lang="en">
      <body>
        <Providers events={events}>
          <Background />
          <Header /> <Logo />
          {children}
          <PrismicPreview repositoryName={repositoryName} />
          <Script id="typekit" strategy="afterInteractive">
            {typeface}
          </Script>
          <Footer />
          {splashscreenVisible && <Splashscreen />}
          <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        </Providers>
      </body>
    </html>
  );
}

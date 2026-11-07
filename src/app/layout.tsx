import localFont from 'next/font/local';
import Script from 'next/script';
import { PrismicPreview } from '@prismicio/next';

import { repositoryName } from '@/prismicio';

import { Providers } from './components/Providers/Providers';
import Background from './components/background/Background';
import Header from './components/header/Header';
import Logo from './components/Logo/Logo';
import Footer from './components/Footer/Footer';
import Splashscreen from './components/Splashscreen/Splashscreen';

import './globals.css';

const clashGrotesk = localFont({
  src: '../fonts/ClashGrotesk-Variable.ttf',
  variable: '--font-clash-grotesk',
  weight: '200 700',
  display: 'swap',
});

const leagueSpartan = localFont({
  src: '../fonts/LeagueSpartan-VariableFont_wght.ttf',
  variable: '--font-league-spartan',
  weight: '100 900',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const splashscreenVisible = process.env.NODE_ENV === 'production';

  return (
    <html
      lang="de-CH"
      className={`${clashGrotesk.variable} ${leagueSpartan.variable}`}
    >
      <body>
        <Providers renderedAt={Date.now()}>
          <Background />
          <Header />
          <Logo />
          {children}
          <PrismicPreview repositoryName={repositoryName} />
          <Footer />
          {splashscreenVisible && <Splashscreen />}
          <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        </Providers>
      </body>
    </html>
  );
}

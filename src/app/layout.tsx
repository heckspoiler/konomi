import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import Script from 'next/script';

import { Providers } from './components/Providers/Providers';

import Background from './components/background/Background';

import Header from './components/header/Header';

import './globals.css';
import Logo from './components/Logo/Logo';

import typeface from '../../helpers/typeface';

import Footer from './components/Footer/Footer';
import Splashscreen from './components/Splashscreen/Splashscreen';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Background />
          <Header /> <Logo />
          {children}
          <PrismicPreview repositoryName={repositoryName} />
          <Script id="typekit" strategy="afterInteractive">
            {typeface}
          </Script>
          <Footer />
          <Splashscreen />
        </Providers>
      </body>
    </html>
  );
}

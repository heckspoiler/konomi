import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import Script from 'next/script';

import Background from './components/background/Background';

import Header from './components/Header/Header';

import './globals.css';
import Logo from './components/Logo/Logo';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Background />
        <Header />
        <Logo />
        {children}

        <PrismicPreview repositoryName={repositoryName} />
        <Script id="typekit" strategy="afterInteractive">
          {`
            (function(d) {
              var config = {
                kitId: 'jwo4cyu',
                scriptTimeout: 1000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `}
        </Script>
      </body>
    </html>
  );
}

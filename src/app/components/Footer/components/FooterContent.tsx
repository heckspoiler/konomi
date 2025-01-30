'use client';

import React, { useState, useEffect } from 'react';

import styles from './FooterContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Heart from '../../heart/Heart';
import NewsletterForm from '../../Homepage/AboutSection/NewsletterForm';

export default function FooterContent({ data }: { data: any }) {
  const [newsletterIsOpen, setNewsletterIsOpen] = useState(false);

  return (
    <>
      {newsletterIsOpen && (
        <div className={styles.newsletterOverlay}>
          <div
            className={styles.crossContainer}
            onClick={() => setNewsletterIsOpen(false)}
            role="button"
            aria-label="Close newsletter"
          >
            <div></div>
            <div></div>
          </div>
          <NewsletterForm stylesprops={styles} arrowFill={'var(--dark-blue)'} />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.upperContent}>
          <PrismicRichText field={data.footer_title} />
          <PrismicRichText field={data.footer_subtitle} />
          <div className={styles.japanese}>
            <PrismicRichText field={data.japanese_subtitle_first} />
            <PrismicRichText field={data.japanese_subtilte_second} />
          </div>
        </div>
        <div className={styles.lowerContent}>
          <div className={styles.contact}>
            <div className={styles.address}>
              <PrismicRichText field={data.address_street} />
              <PrismicRichText field={data.address_postcode} />
            </div>
            <div className={styles.socials}>
              {data.socials_links.map((item: any, index: number) => (
                <div
                  className={styles.socialItem}
                  key={index}
                  onClick={() => {
                    if (item.socials_link.text === 'Newsletter') {
                      setNewsletterIsOpen(true);
                    }
                  }}
                >
                  <PrismicNextLink field={item.socials_link}>
                    <p>{item.socials_link.text}</p>
                    <PrismicNextImage field={item.socials_icon} />
                  </PrismicNextLink>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.supporters}>
            <div className={styles.titleContainer}>
              <Heart width="15" height="15" />
              <PrismicRichText field={data.supporters_subtitle} />
            </div>
            <div className={styles.supportersLogos}>
              {data.supporters.map((item: any, index: number) => (
                <div key={index} className={styles.supporter}>
                  <PrismicNextLink field={item.supporters_link}>
                    <PrismicNextImage field={item.supporters_image} />
                  </PrismicNextLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import React, { useState } from 'react';

import styles from './FooterContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Heart from '../../heart/Heart';
import NewsletterForm from '../../Homepage/AboutSection/NewsletterForm';
import { FooterDocument } from '@/prismicio-types';

export default function FooterContent({ footer }: { footer: FooterDocument }) {
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
          <NewsletterForm stylesprops={styles} />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.upperContent}>
          <PrismicRichText field={footer.data.footer_title} />
          <PrismicRichText field={footer.data.footer_subtitle} />
          <div className={styles.japanese}>
            <PrismicRichText field={footer.data.japanese_subtitle_first} />
            <PrismicRichText field={footer.data.japanese_subtilte_second} />
          </div>
        </div>
        <div className={styles.lowerContent}>
          <div className={styles.contact}>
            <div className={styles.address}>
              <PrismicRichText field={footer.data.address_street} />
              <PrismicRichText field={footer.data.address_postcode} />
            </div>
            <div className={styles.socials}>
              {footer.data.socials_links.map((item, index) => (
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
              <PrismicRichText field={footer.data.supporters_subtitle} />
            </div>
            <div className={styles.supportersLogos}>
              {footer.data.supporters.map((item, index) => (
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

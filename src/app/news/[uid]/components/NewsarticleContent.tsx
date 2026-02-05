'use client';
import React, { useState } from 'react';
import { NewsarticleDocument, NewsDocument } from '@/prismicio-types';

import styles from './NewsarticleContent.module.css';
import { PrismicRichText } from '@prismicio/react';
import TitleContainer from '../../components/TitleContainer';
import DateComponent from '@/app/events/[uid]/components/DateComponent';
import EventImage from '@/app/events/[uid]/components/EventImage';
import { PrismicNextLink } from '@prismicio/next';
import DescriptionContainer from '@/app/components/DescriptionContainer/DescriptionContainer';
import NewsletterForm from '@/app/components/Homepage/AboutSection/NewsletterForm';
import TagContainer from '../../components/TagContainer';
import { useMobile } from '@contexts/MobileContext';
import OverlayContainer from '@/app/components/OverlayContainer/OverlayContainer';
import { isFilled } from '@prismicio/client';

type NewsArticleContentProps = {
  page: NewsarticleDocument;
  newsPage: NewsDocument;
};

export default function NewsarticleContent({
  page,
  newsPage,
}: NewsArticleContentProps) {
  const [overlayIsOpen, setOverlayIsOpen] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<number>(0);
  const { isMobile } = useMobile();
  return (
    <div className={styles.container}>
      <TitleContainer page={newsPage} />
      <div className={styles.content}>
        <div className={styles.titlecontainer}>
          <PrismicRichText field={page.data.title} />
        </div>
        <div className={styles.middlecontainer}>
          <TagContainer article={page} />
          <div className={styles.date}>
            <DateComponent variant="news" document={page} />
          </div>
        </div>
        <EventImage
          image={page.data.hero_image}
          images={page.data.gallery}
          setOverlayIsOpen={setOverlayIsOpen}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          isMobile={isMobile}
        />
        <DescriptionContainer>
          <PrismicRichText field={page.data.description} />
        </DescriptionContainer>
        <div className={styles.backtolink}>
          {isFilled.link(page.data.redirect_link) && (
            <PrismicNextLink field={page.data.redirect_link} />
          )}
          <PrismicNextLink href={newsPage.url as string}>
            Zur Übersicht
          </PrismicNextLink>
        </div>

        {page.data.has_newsletterfield && (
          <div className={styles.newsletterbox}>
            <NewsletterForm />
          </div>
        )}
      </div>
      <OverlayContainer
        overlayIsOpen={overlayIsOpen}
        setOverlayIsOpen={setOverlayIsOpen}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        data={page.data}
        page={page}
      />
    </div>
  );
}

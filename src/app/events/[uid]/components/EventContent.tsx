'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import MainHeading from '../../components/MainHeading';

import styles from './EventContent.module.css';

import { PrismicRichText } from '@prismicio/react';

import { PrismicNextLink } from '@prismicio/next';

import EventImage from './EventImage';

import IconComponent from '../../components/IconComponent';

import { useMobile } from '../../../../../contexts/MobileContext';

import LocationComponent from './LocationComponent';
import DateComponent from './DateComponent';
import Link from 'next/link';
import BackToComponent from '../../components/BackToComponent';
import OverlayImage from './OverlayImage';
import {
  EventDocument,
  EventsDocumentData,
  Simplify,
} from '../../../../../prismicio-types';
import { PrismicDocumentWithUID } from '@prismicio/client';
import SkipArrow from './SkipArrow';
import Cross from './Cross';

export default function EventContent({
  page,
  events,
}: {
  page: EventDocument;
  events: PrismicDocumentWithUID<Simplify<EventsDocumentData>>;
}) {
  const data = page.data;
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const buttonShow = page.tags.includes('archived');
  const [activeImage, setActiveImage] = useState<number>(0);
  const { isMobile } = useMobile();
  const pathname = usePathname();
  const [backComponent, setBackComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (!buttonShow) {
      setBackComponent(
        <div className={styles.backToContainer}>
          <BackToComponent text="Mehr Events" url="/events" />
        </div>,
      );
    } else if (buttonShow) {
      setBackComponent(
        <BackToComponent text="Zurück zum Archiv" url="/archive" />,
      );
    }
  }, [pathname, buttonShow]);

  return (
    <div className={styles.container}>
      <MainHeading title={'Event'} page={events} buttonShow={buttonShow} />

      <div className={styles.eventContainer}>
        <div className={styles.titleContainer}>
          <PrismicRichText field={data.event_title} />
        </div>
        <IconComponent event={page} />
        <div className={styles.infoContainer}>
          <PrismicNextLink field={data.google_location_link}>
            <LocationComponent data={data} />
          </PrismicNextLink>

          <DateComponent variant="event" data={data} />

          <div className={styles.linkContainer}>
            {!buttonShow ? (
              <PrismicNextLink field={data.eventfrog_link}>
                Tickets
              </PrismicNextLink>
            ) : (
              <Link href="/events">Events</Link>
            )}
          </div>
        </div>
        <div>
          <EventImage
            image={data.event_image}
            images={data.gallery}
            setOverlayIsOpen={setOverlayIsOpen}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            isMobile={isMobile}
          />
        </div>

        <div className={styles.descriptionContainer}>
          {data.event_description.map((item, index: number) => {
            if (!('text' in item) || item.text.trim() === '') return null;

            return (
              <div key={index} className={styles.descriptionParagraph}>
                <p>{item.text.replace(/\n/g, ' ')}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.locationLink}>
          <PrismicNextLink field={data.location_website}>
            Über{' '}
            {data.event_location[0] &&
              'text' in data.event_location[0] &&
              data.event_location[0].text}
          </PrismicNextLink>
        </div>
      </div>

      {backComponent}
      <div
        className={`${styles.overlayImageContainer} ${overlayIsOpen ? styles.isOpen : ''}`}
      >
        <Cross onClick={() => setOverlayIsOpen(false)} />
        <OverlayImage
          image={data.event_image}
          activeImage={activeImage}
          images={data.gallery}
        />{' '}
        {data.gallery.length > 0 && (
          <>
            <SkipArrow
              onClick={() =>
                activeImage !== undefined && activeImage > 0
                  ? setActiveImage && setActiveImage(activeImage - 1)
                  : setActiveImage &&
                    setActiveImage(page.data.gallery.length - 1)
              }
              className={styles.arrowcontainerOne}
              isMobile={isMobile}
            />
            <SkipArrow
              onClick={() =>
                activeImage !== undefined &&
                activeImage < page.data.gallery.length - 1
                  ? setActiveImage && setActiveImage(activeImage + 1)
                  : setActiveImage && setActiveImage(0)
              }
              className={styles.arrowcontainerTwo}
              isMobile={isMobile}
            />
          </>
        )}
      </div>
    </div>
  );
}

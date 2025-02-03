'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import MainHeading from '../../components/MainHeading';

import styles from './EventContent.module.css';

import { PrismicRichText } from '@prismicio/react';

import { PrismicNextLink } from '@prismicio/next';

import EventImage from './EventImage';

import IconComponent from '../../components/IconComponent';

import LocationComponent from './LocationComponent';
import DateComponent from './DateComponent';
import Link from 'next/link';
import BackToComponent from '../../components/BackToComponent';
import OverlayImage from './OverlayImage';

export default function EventContent({
  page,
  events,
}: {
  page: any;
  events: any;
}) {
  const data = page.data;
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const buttonShow = page.tags.includes('archived');

  const pathname = usePathname();
  const [backComponent, setBackComponent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (!buttonShow) {
      setBackComponent(
        <div className={styles.backToContainer}>
          <BackToComponent text="Mehr Events" url="/events" />
        </div>
      );
    } else if (buttonShow) {
      setBackComponent(
        <BackToComponent text="Zurück zum Archiv" url="/archive" />
      );
    }
  }, [pathname]);

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
          <DateComponent data={data} />
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
        <div onClick={() => setOverlayIsOpen(true)}>
          <EventImage image={data.event_image} />
        </div>
        <div className={styles.descriptionContainer}>
          <p>{data.event_description}</p>
        </div>{' '}
        <div className={styles.locationLink}>
          <PrismicNextLink field={data.location_website}>
            Mehr über {data.event_location[0].text} erfahren
          </PrismicNextLink>
        </div>
      </div>

      {backComponent}
      <div
        className={`${styles.overlayImageContainer} ${overlayIsOpen ? styles.isOpen : ''}`}
      >
        <div onClick={() => setOverlayIsOpen(false)} className={styles.cross}>
          <div className={styles.crossContainer}>
            <div></div>
            <div></div>
          </div>
        </div>
        <OverlayImage image={data.event_image} />
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import MainHeading from '../../components/MainHeading';

import styles from './EventContent.module.css';

import { PrismicRichText } from '@prismicio/react';

import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import EventImage from './EventImage';

import IconComponent from '../../components/IconComponent';

import LocationComponent from './LocationComponent';
import DateComponent from './DateComponent';
import Link from 'next/link';
import BackToComponent from '../../components/BackToComponent';

export default function EventContent({
  page,
  events,
}: {
  page: any;
  events: any;
}) {
  const data = page.data;

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
          <LocationComponent data={data} />
          <DateComponent data={data} />
          <div className={styles.linkContainer}>
            {!buttonShow ? (
              <PrismicNextLink field={data.eventfrog_link} />
            ) : (
              <Link href="/events">Events</Link>
            )}
          </div>
        </div>
        <EventImage image={data.event_image} />
        <div className={styles.descriptionContainer}>
          <p>{data.event_description}</p>
        </div>
      </div>
      {backComponent}
    </div>
  );
}

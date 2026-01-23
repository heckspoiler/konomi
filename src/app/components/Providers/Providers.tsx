'use client';

import { EventsProvider } from '../../../../contexts/EventsContext';
import { MobileProvider } from '../../../../contexts/MobileContext';
import { EventDocument } from '../../../../prismicio-types';

export function Providers({
  children,
  events,
}: {
  children: React.ReactNode;
  events: EventDocument[];
}) {
  return (
    <EventsProvider events={events}>
      <MobileProvider>{children}</MobileProvider>
    </EventsProvider>
  );
}

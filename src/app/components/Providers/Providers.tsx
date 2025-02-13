'use client';

import { EventsProvider } from '../../../../contexts/EventsContext';
import { MobileProvider } from '../../../../contexts/MobileContext';

export function Providers({
  children,
  events,
}: {
  children: React.ReactNode;
  events: Object[];
}) {
  return (
    <EventsProvider events={events}>
      <MobileProvider>{children}</MobileProvider>
    </EventsProvider>
  );
}

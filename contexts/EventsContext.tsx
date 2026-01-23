'use client';

import { createContext, useContext } from 'react';
import { EventDocument } from '../prismicio-types';

interface EventsContextType {
  events: EventDocument[];
}

const EventsContext = createContext<EventsContextType>({
  events: [],
});

export function EventsProvider({
  children,
  events,
}: {
  children: React.ReactNode;
  events: EventDocument[];
}) {
  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('Error using EventsContext');
  }
  return context;
}

'use client';

import { createContext, useContext, useState } from 'react';

interface EventsContextType {
  events: Object[];
}

const EventsContext = createContext<EventsContextType>({
  events: [],
});

export function EventsProvider({
  children,
  events,
}: {
  children: React.ReactNode;
  events: Object[];
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

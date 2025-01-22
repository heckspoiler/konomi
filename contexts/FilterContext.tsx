// FilterContext.tsx
import React, { createContext, useContext, useState } from 'react';

type FilterContextType = {
  selectedDate: string;
  selectedLocation: string;
  selectedEventType: string;
  setSelectedDate: (date: string) => void;
  setSelectedLocation: (location: string) => void;
  setSelectedEventType: (eventType: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');

  return (
    <FilterContext.Provider
      value={{
        selectedDate,
        selectedLocation,
        selectedEventType,
        setSelectedDate,
        setSelectedLocation,
        setSelectedEventType,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

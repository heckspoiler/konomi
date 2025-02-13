import { create } from 'zustand';

export const eventsStore = create((set) => ({
  events: [],
  setEvents: (events: Object[]) => set({ events }),
}));

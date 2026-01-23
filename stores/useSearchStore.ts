import { create } from 'zustand';

export type SearchbarStoreProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const useSearchbarStore = create<SearchbarStoreProps>((set) => ({
  query: '',
  setQuery: (query: string) => {
    set({
      query: query,
    });
  },
}));

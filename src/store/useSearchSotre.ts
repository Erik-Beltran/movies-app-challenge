import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Movie} from '../types/movie';

interface SearchState {
  query: string;
  results: Movie[];
  setQuery: (text: string) => void;
  clearSearch: () => void;
  clearResult: () => void;
  addMovies: (movie: Movie) => void;
}

export const useSearchStore = create(
  persist<SearchState>(
    (set, get) => ({
      query: '',
      results: [],
      setQuery: text => set({query: text}),
      clearSearch: () => set({query: '', results: []}),
      clearResult: () => set({results: []}),

      addMovies: (movie: Movie) => {
        const {results} = get();
        const existingItem = results.find(item => item.id === movie.id);

        if (existingItem) {
          return;
        }
        set({
          results: [...results, movie],
        });
      },
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

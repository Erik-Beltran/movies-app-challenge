import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MovieDetails} from '../types/movie';

interface FavoritesState {
  favorites: MovieDetails[];
  isFavorite: (movieId: number) => boolean;
  toggleFavorite: (movie: MovieDetails) => void;
}

export const useFavoritesStore = create(
  persist<FavoritesState>(
    (set, get) => ({
      favorites: [],
      isFavorite: movieId => {
        return get().favorites.some(movie => movie.id === movieId);
      },
      toggleFavorite: movie => {
        const {favorites} = get();
        const exists = favorites.some(fav => fav.id === movie.id);

        if (exists) {
          set({
            favorites: favorites.filter(fav => fav.id !== movie.id),
          });
        } else {
          set({
            favorites: [...favorites, movie],
          });
        }
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

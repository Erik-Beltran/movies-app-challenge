import axiosInstance from './axiosInstance';

import {Movie, NowPlayingResponse} from '../types/apiResponses';
import mapMovieFromApi from '../mappers/movieMapper';

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<NowPlayingResponse>(
      '/now_playing',
    );

    return response.data.results.map(mapMovieFromApi);
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};

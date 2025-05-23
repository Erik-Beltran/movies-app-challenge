import axiosInstance from './axiosInstance';

import {Movie, NowPlayingResponse} from '../types/apiResponses';

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<NowPlayingResponse>(
      '/now_playing',
    );

    return response.data.results;
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};

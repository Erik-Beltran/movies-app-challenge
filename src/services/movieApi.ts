import axiosInstance from './axiosInstance';

import {Movie, PaginatedResponse} from '../types/apiResponses';
import mapMovieFromApi from '../mappers/movieMapper';

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>('/now_playing');
    console.log('mappedMovies getNowPlayingMovies');

    return response.data.results.map(mapMovieFromApi);
  } catch (error) {
    throw new Error('Error getting movies');
  }
};

export const getPopularMovies = async (
  pageParam: number = 1,
): Promise<PaginatedResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>('/popular', {
      params: {
        page: pageParam,
      },
    });

    const mappedMovies = response.data.results.map(mapMovieFromApi);

    return {
      ...response.data,
      results: mappedMovies,
    };
  } catch (error) {
    console.log('error', error);
    throw new Error('Error getting movies');
  }
};

export const getTopRatedMovies = async (
  pageParam: number = 1,
): Promise<PaginatedResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>('/top_rated', {
      params: {
        page: pageParam,
      },
    });

    const mappedMovies = response.data.results.map(mapMovieFromApi);

    return {
      ...response.data,
      results: mappedMovies,
    };
  } catch (error) {
    throw new Error('Error getting movies');
  }
};

export const getUpcomingMovies = async (
  pageParam: number = 1,
): Promise<PaginatedResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>('/upcoming', {
      params: {
        page: pageParam,
      },
    });

    const mappedMovies = response.data.results.map(mapMovieFromApi);

    return {
      ...response.data,
      results: mappedMovies,
    };
  } catch (error) {
    throw new Error('Error getting movies');
  }
};

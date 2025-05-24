import axiosInstance from './axiosInstance';

import {PaginatedResponse} from '../types/apiResponses';
import {Movie, MovieDetails} from '../types/movie';
import {mapMovieDetailsFromApi, mapMovieFromApi} from '../mappers/movieMapper';
import {CastElement} from '../types/cast';
import mapCastFromApi from '../mappers/castMapper';

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>('/now_playing');

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

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await axiosInstance.get<MovieDetails>(`/${id}`);
    return mapMovieDetailsFromApi(response.data);
  } catch (error) {
    throw new Error('Error getting movies');
  }
};

export const getMovieCast = async (id: number): Promise<CastElement[]> => {
  try {
    const response = await axiosInstance.get<{cast: CastElement[]}>(
      `/${id}/credits`,
    );
    return response.data.cast.map(mapCastFromApi);
  } catch (error) {
    console.log('error', error);
    throw new Error('Error getting movies');
  }
};

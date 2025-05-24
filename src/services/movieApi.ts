import axiosInstance from './axiosInstance';

import {PaginatedResponse} from '../types/apiResponses';
import {Movie, MovieDetails} from '../types/movie';
import {mapMovieDetailsFromApi, mapMovieFromApi} from '../mappers/movieMapper';
import {CastElement} from '../types/cast';
import mapCastFromApi from '../mappers/castMapper';

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>(
      '/movie/now_playing',
    );

    return response.data.results.map(mapMovieFromApi);
  } catch (error) {
    throw new Error('Error getting movies');
  }
};

export const getPopularMovies = async (
  pageParam: number = 1,
): Promise<PaginatedResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>(
      '/movie/popular',
      {
        params: {
          page: pageParam,
        },
      },
    );

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
    const response = await axiosInstance.get<PaginatedResponse>(
      '/movie/top_rated',
      {
        params: {
          page: pageParam,
        },
      },
    );

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
    const response = await axiosInstance.get<PaginatedResponse>(
      '/movie/upcoming',
      {
        params: {
          page: pageParam,
        },
      },
    );

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
    const response = await axiosInstance.get<MovieDetails>(`/movie/${id}`);
    return mapMovieDetailsFromApi(response.data);
  } catch (error) {
    throw new Error('Error getting movies');
  }
};

export const getMovieCast = async (id: number): Promise<CastElement[]> => {
  try {
    const response = await axiosInstance.get<{cast: CastElement[]}>(
      `/movie/${id}/credits`,
    );
    return response.data.cast.map(mapCastFromApi);
  } catch (error) {
    console.log('error', error);
    throw new Error('Error getting movies');
  }
};

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<PaginatedResponse> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse>(
      'search/movie',
      {
        params: {
          query,
          page,
        },
      },
    );

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

import {Movie, MovieDetails} from '../types/movie';

export const mapMovieFromApi = (movie: Movie) => {
  return {
    ...movie,
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
};

export const mapMovieDetailsFromApi = (movie: MovieDetails) => {
  return {
    ...movie,
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
};

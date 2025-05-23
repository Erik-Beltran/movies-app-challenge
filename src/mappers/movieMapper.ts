import {Movie} from '../types/apiResponses';

const mapMovieFromApi = (movie: Movie) => {
  return {
    ...movie,
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
};

export default mapMovieFromApi;

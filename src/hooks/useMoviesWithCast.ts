import {useEffect} from 'react';

import {useInfiniteQuery} from '@tanstack/react-query';
import {useSearchStore} from '../store/useSearchSotre';
import {getMovieCast, searchMovies} from '../services/movieApi';
import {CastElement} from '../types/cast';
import {PaginatedResponse} from '../types/apiResponses';

const validateCast = (cast: CastElement[]) => {
  const maleCount = cast.filter(person => person.gender === 2).length;
  const femaleCount = cast.filter(person => person.gender === 1).length;

  return maleCount >= 3 && femaleCount >= 3;
};

const validateTitle = (title: string, searchLetter: string) => {
  return title.toLowerCase().startsWith(searchLetter.toLowerCase());
};

export const useMoviesWithCast = (query: string) => {
  const addMovies = useSearchStore(state => state.addMovies);
  const clearResult = useSearchStore(state => state.clearResult);

  const {data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery<PaginatedResponse>({
      enabled: !!query,
      queryKey: ['searchMovies', query],
      queryFn: async ({pageParam = 1}) => {
        const movieData = await searchMovies(query, pageParam as number);

        const filteredMovies = movieData.results.filter(
          movie => movie.genre_ids.length > 2,
        );

        for (const movie of filteredMovies) {
          const cast = await getMovieCast(movie.id);

          if (validateTitle(movie.title, query) && validateCast(cast)) {
            addMovies(movie);
          }
        }

        return movieData;
      },
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

  useEffect(() => {
    clearResult();
  }, [query, clearResult]);

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

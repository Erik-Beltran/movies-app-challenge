import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../services/movieApi';
import {PaginatedResponse} from '../types/apiResponses';

export type CategoryKey = 'popular' | 'top_rated' | 'upcoming';

interface CategoryConfig {
  title: string;
  queryKey: readonly [CategoryKey, 'infinite'];
  fetchFn: (page: number) => Promise<PaginatedResponse>;
}

const categoryConfigs: Record<CategoryKey, CategoryConfig> = {
  popular: {
    title: 'Popular',
    queryKey: ['popular', 'infinite'],
    fetchFn: getPopularMovies,
  },
  top_rated: {
    title: 'Top Rated',
    queryKey: ['top_rated', 'infinite'],
    fetchFn: getTopRatedMovies,
  },
  upcoming: {
    title: 'Upcoming',
    queryKey: ['upcoming', 'infinite'],
    fetchFn: getUpcomingMovies,
  },
};

export const getCategoryConfig = (key: CategoryKey): CategoryConfig => {
  return categoryConfigs[key];
};

import {Dates, Movie} from './movie';

export interface PaginatedResponse {
  dates?: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

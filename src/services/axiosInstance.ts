import axios from 'axios';
import {MOVIE_DB_API_KEY} from '@env';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: MOVIE_DB_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

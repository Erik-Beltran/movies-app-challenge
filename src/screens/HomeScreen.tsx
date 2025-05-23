import {useQuery} from '@tanstack/react-query';
import {ScrollView, View} from 'react-native';

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../services/movieApi';
import MoviesCarousel from '../components/MoviesCarousel';
import HorizontalMovieList from '../components/HorizontalMovieList';

const HomeScreen = () => {
  const {data: playingNowMovies = []} = useQuery({
    queryKey: ['now_playing'],
    queryFn: () => getNowPlayingMovies(),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <ScrollView>
      <View>
        <MoviesCarousel movies={playingNowMovies} />
      </View>
      <HorizontalMovieList
        title="Popular"
        fetchFn={getPopularMovies}
        queryKey={['popular', 'infinite']}
      />
      <HorizontalMovieList
        title="Top Rated"
        fetchFn={getTopRatedMovies}
        queryKey={['top_rated', 'infinite']}
      />
      <HorizontalMovieList
        title="Upcoming"
        fetchFn={getUpcomingMovies}
        queryKey={['upcoming', 'infinite']}
      />
    </ScrollView>
  );
};

export default HomeScreen;

import {useQuery} from '@tanstack/react-query';
import {ScrollView, View} from 'react-native';

import {getNowPlayingMovies} from '../services/movieApi';
import MoviesCarousel from '../components/MoviesCarousel';

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
    </ScrollView>
  );
};

export default HomeScreen;

import {ScrollView, View} from 'react-native';
import {Movie} from '../types/apiResponses';
import MoviePoster from './MoviePoster';

interface Props {
  movies: Movie[];
}

const MoviesCarousel = ({movies}: Props) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <MoviePoster movie={movie} key={movie.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MoviesCarousel;

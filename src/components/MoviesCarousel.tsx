import {ScrollView, View} from 'react-native';
import MoviePoster from './MoviePoster';
import {Movie} from '../types/movie';

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

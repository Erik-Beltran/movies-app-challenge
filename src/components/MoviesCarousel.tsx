import {useWindowDimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import MoviePoster from './MoviePoster';
import {Movie} from '../types/movie';

interface Props {
  movies: Movie[];
}

const MoviesCarousel = ({movies}: Props) => {
  const {width, height: screenHeight} = useWindowDimensions();

  return (
    <View>
      <Carousel
        data={movies}
        renderItem={({item}) => (
          <MoviePoster
            movie={item}
            heigth={screenHeight * 0.45}
            width={width}
          />
        )}
        sliderWidth={width}
        itemWidth={width}
        autoplay={true}
        loop={true}
        autoplayInterval={3000}
        autoplayDelay={500}
        vertical={false}
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={0.7}
      />
    </View>
  );
};

export default MoviesCarousel;

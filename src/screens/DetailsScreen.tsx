import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions,
  FlatList,
  Text,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParams} from '../navigation/HomeStackNavigator';
import {useQuery} from '@tanstack/react-query';
import {getMovieCast, getMovieDetails} from '../services/movieApi';

import Chip from '../components/Chip';
import ActorCard from '../components/ActorCard';

import {
  formatRuntime,
  getYearFromDate,
  roundToOneDecimal,
} from '../utils/helpers/formatters';
import {useFavoritesStore} from '../store/useFavoritesStore';

interface Props extends StackScreenProps<HomeStackParams, 'Details'> {}

const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  const {height: screenHeight} = useWindowDimensions();
  const isFavorite = useFavoritesStore(state => state.isFavorite(movieId));
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

  const {data: movie} = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetails(movieId),
    staleTime: 1000 * 60 * 60,
  });

  const {data: cast} = useQuery({
    queryKey: ['movie_cast', movieId],
    queryFn: () => getMovieCast(movieId),
    staleTime: 1000 * 60 * 60,
  });

  console.log('isFavorite', isFavorite);

  if (!movie) {
    return null;
  } // o puedes renderizar un mensaje

  return (
    <ScrollView>
      <View style={{...styles.imageContainer, height: screenHeight * 0.6}}>
        <Image style={styles.image} source={{uri: movie?.poster_path}} />
      </View>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Icon
            onPress={() => toggleFavorite(movie)}
            name={isFavorite ? 'bookmark' : 'bookmark-outline'}
            color={'#714CF8'}
            size={30}
          />
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.average}>
              <Icon name="star" size={16} color={'#FAC400'} />
              {movie?.vote_average && roundToOneDecimal(movie?.vote_average)}
            </Text>
            <Text style={styles.textWhite}>
              <Icon name="time-outline" size={16} color={'white'} />
              {movie?.runtime && formatRuntime(movie.runtime)}
            </Text>
            <Text style={styles.textWhite}>
              {movie?.release_date && getYearFromDate(movie.release_date)}
            </Text>
          </View>
        </View>
        <FlatList
          data={movie?.genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Chip label={item.name} />}
        />

        <Text style={styles.overwiew}>{movie?.overview}</Text>

        <View style={styles.castContainer}>
          <Text style={styles.overwiew}>Cast</Text>
          <FlatList
            data={cast}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ActorCard actor={item} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  image: {
    flex: 1,
  },

  body: {
    marginTop: 16,
    paddingHorizontal: 24,
  },

  row: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'flex-end',
    marginBottom: 16,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
    width: '85%',
  },
  overwiew: {
    color: 'white',
    fontSize: 16,
    marginVertical: 16,
  },
  average: {
    color: '#FAC400',
    fontWeight: 'bold',
    fontSize: 14,
  },

  textWhite: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    rowGap: 4,
    flexDirection: 'row',
    opacity: 0.9,
  },

  castContainer: {
    marginBottom: 24,
  },
});

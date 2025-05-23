import {NavigationProp, useNavigation} from '@react-navigation/native';

import {View, Image, StyleSheet, Pressable} from 'react-native';
import {Movie} from '../types/apiResponses';
import {HomeStackParams} from '../navigation/HomeStackNavigator';

interface Props {
  movie: Movie;
}

const MoviePoster = ({movie}: Props) => {
  const navigation = useNavigation<NavigationProp<HomeStackParams>>();
  const {poster_path} = movie;

  const goToDetails = () => {
    navigation.navigate('Details', {movieId: movie.id});
  };
  return (
    <Pressable
      onPress={goToDetails}
      style={({pressed}) => ({
        marginHorizontal: 10,
        paddingBottom: 20,
        opacity: pressed ? 0.9 : 1,
      })}>
      <View style={styles.imageContainer}>
        <Image source={{uri: poster_path}} style={styles.image} />
      </View>
    </Pressable>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
    width: 200,
    height: 300,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
  },
});

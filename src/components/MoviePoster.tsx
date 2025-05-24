import {View, Image, StyleSheet, Pressable, Text} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {HomeStackParams} from '../navigation/HomeStackNavigator';
import {Movie} from '../types/movie';

interface Props {
  movie: Movie;
  heigth?: number;
  width?: number;
  showTitle?: boolean;
}

const MoviePoster = ({
  movie,
  width = 200,
  heigth = 300,
  showTitle = false,
}: Props) => {
  const navigation = useNavigation<NavigationProp<HomeStackParams>>();
  const {poster_path, title} = movie;

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
        alignItems: 'center',
      })}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: poster_path}}
          style={{...styles.image, width: width, height: heigth}}
        />
      </View>
      {showTitle && (
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.title}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
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
  title: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 100,
    flex: 1,
    fontWeight: 'bold',
  },
});

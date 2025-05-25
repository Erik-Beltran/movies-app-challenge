import {View, Text, StyleSheet, FlatList} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import MoviePoster from '../components/MoviePoster';

import {useFavoritesStore} from '../store/useFavoritesStore';

const WatchListScreen = () => {
  const favorites = useFavoritesStore(state => state.favorites);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyMessage}>
          <Icon name="film-outline" size={50} color="white" />
          <Text style={styles.emptyMessage}>
            Your watch list is empty. Start saving movies to see them here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toLocaleString()}
          renderItem={({item}) => (
            <MoviePoster movie={item} heigth={150} width={100} showTitle />
          )}
          numColumns={3}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },

  emptyMessage: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    alignItems: 'center',
  },
});

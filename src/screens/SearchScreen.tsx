import {
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  View,
  Text,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import MoviePoster from '../components/MoviePoster';
import Loader from '../components/common/Loader';

import {useSearchStore} from '../store/useSearchSotre';
import {useSearchMovies} from '../hooks/useSearchMovies';

const SearchScreen = () => {
  const query = useSearchStore(state => state.query);
  const setQuery = useSearchStore(state => state.setQuery);
  const clearSearch = useSearchStore(state => state.clearSearch);
  const results = useSearchStore(state => state.results);

  const {fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useSearchMovies(query);

  return (
    <View style={styles.conatiner}>
      <View>
        <TextInput
          autoCapitalize="none"
          value={query}
          onChangeText={setQuery}
          placeholder="Search Movie..."
          placeholderTextColor="white"
          returnKeyType="search"
          style={styles.searchInput}
        />

        <Icon
          name="search-outline"
          size={20}
          color="white"
          style={styles.icon}
        />
        {query && (
          <Pressable style={styles.deleteIcon} onPress={clearSearch}>
            <Icon name="trash-outline" size={20} color="white" />
          </Pressable>
        )}
      </View>

      {isLoading && <Loader />}

      {query !== '' && results.length === 0 ? (
        <View style={styles.noFoundContainer}>
          <Text style={styles.noFoundLabel}>No movies found for "{query}"</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toLocaleString()}
          renderItem={({item}) => (
            <MoviePoster movie={item} heigth={150} width={100} showTitle />
          )}
          numColumns={3}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  conatiner: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#232E51',
    color: 'white',
    padding: 10,
    position: 'relative',
    paddingLeft: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    bottom: 0,
    right: 10,
  },
  noFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  noFoundLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

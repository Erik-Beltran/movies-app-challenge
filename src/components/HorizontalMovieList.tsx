import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {PaginatedResponse} from '../types/apiResponses';
import MoviePoster from './MoviePoster';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParams} from '../navigation/HomeStackNavigator';

interface Props {
  title: string;
  queryKey: string;
  fetchFn: (page: number) => Promise<PaginatedResponse>;
}
const HorizontalMovielist = ({title, fetchFn, queryKey}: Props) => {
  const navigation = useNavigation<NavigationProp<HomeStackParams>>();

  const {data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useInfiniteQuery<PaginatedResponse>({
      queryKey: [`${queryKey}`, 'infinite'],
      queryFn: ({pageParam = 1}) => fetchFn(pageParam as number),
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      staleTime: 1000 * 60 * 60,
    });

  const movies = data?.pages.flatMap(page => page.results) ?? [];

  const goToCategory = () => {
    navigation.navigate('Category', {category: queryKey});
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        <Pressable onPress={goToCategory}>
          <Text style={styles.textWhite}>View all</Text>
        </Pressable>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MoviePoster movie={item} heigth={150} width={100} />
        )}
        onEndReachedThreshold={0.6}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalMovielist;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
    color: 'white',
  },
  textWhite: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    opacity: 0.9,
  },
});

import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {StackScreenProps} from '@react-navigation/stack';

import MoviePoster from '../components/MoviePoster';
import {HomeStackParams} from '../navigation/HomeStackNavigator';

import {PaginatedResponse} from '../types/apiResponses';
import {CategoryKey, getCategoryConfig} from '../config/categories';
import Loader from '../components/common/Loader';

interface Props extends StackScreenProps<HomeStackParams, 'Category'> {}

const CategoryScreen = ({route}: Props) => {
  const category = route.params.category as CategoryKey;

  const {title, fetchFn, queryKey} = getCategoryConfig(category);

  const {data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useInfiniteQuery<PaginatedResponse>({
      queryKey,
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
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
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
    textAlign: 'left',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});

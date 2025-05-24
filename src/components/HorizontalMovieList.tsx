import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import {PaginatedResponse} from '../types/apiResponses';
import MoviePoster from './MoviePoster';

interface Props {
  title: string;
  queryKey: string[];
  fetchFn: (page: number) => Promise<PaginatedResponse>;
}
const HorizontalMovielist = ({title, fetchFn, queryKey}: Props) => {
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
    });

  const movies = data?.pages.flatMap(page => page.results) ?? [];

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
    color: 'white',
  },
});

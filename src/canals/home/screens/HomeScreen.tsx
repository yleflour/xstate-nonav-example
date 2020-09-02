import React, { useContext } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Header } from '../../../atoms/Header';
import { MovieCard } from '../../../atoms/MovieCard';
import { RootMachineProvider } from '../../../module/root.machine';

const data = [
  {
    title: 'Continue watching for Thomas',
    dataFilter: (movie: any) => movie.progress > 0,
  },
  {
    title: 'My List',
    dataFilter: (movie: any) => movie.myList,
  },
  {
    title: 'Downloaded',
    dataFilter: (movie: any) => movie.downloaded,
  },
  {
    title: 'Discover',
    dataFilter: (movie: any) => movie.progress === 0,
  },
];

export const HomeScreen = () => {
  // @ts-ignore
  const [current, send] = useContext(RootMachineProvider);
  const movies = current.context.movies;

  const headerMovie = movies.find((movie: any) => !movie.myList);

  return (
    <View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={
          <View style={{ position: 'relative' }}>
            <Header
              onPress={() => send('MOVIE_PLAY', { movie: headerMovie })}
              title={headerMovie.title}
              subtitle="New episodes available"
              imageUri={headerMovie.imageUri}
            />
          </View>
        }
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          const sectionMovies = movies.filter(item.dataFilter);
          return (
            <>
              <Text
                style={{
                  fontSize: 12,
                  color: '#FFFFFF',
                  fontWeight: '500',
                  marginLeft: 15,
                }}
              >
                {item.title}
              </Text>
              <FlatList
                keyExtractor={(item) => item.imageUri}
                data={sectionMovies}
                style={{ marginTop: 10, marginBottom: 5 }}
                contentContainerStyle={{
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}
                horizontal
                renderItem={({ item }) => (
                  <MovieCard
                    movie={item}
                    onPress={() => send('MOVIE_PLAY', { movie: item })}
                  />
                )}
              />
            </>
          );
        }}
      />
    </View>
  );
};

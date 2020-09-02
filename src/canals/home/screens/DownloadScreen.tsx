import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Header } from '../../../atoms/Header';
import { MovieCard } from '../../../atoms/MovieCard';
import { RootMachineProvider } from '../../../module/root.machine';

const data = [
  {
    title: 'Séries téléchargées',
    dataFilter: (movie: any) => movie.downloaded,
  },
];

export const DownloadScreen = () => {
  // @ts-ignore
  const [current, send] = useContext(RootMachineProvider);
  const movies = current.context.movies;
  const headerMovie = movies.find((movie: any) => movie.downloaded);

  return (
    <View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={
          <Header
            onPress={() => send('MOVIE_PLAY', { movie: headerMovie })}
            title={headerMovie.title}
            subtitle="10 épisodes téléchargés"
            imageUri={headerMovie.imageUri}
          />
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
                    onPress={() => send('PLAY_MOVIE', { movie: item })}
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

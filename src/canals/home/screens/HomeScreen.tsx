import React, { useContext } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { observer } from 'mobx-react';
import { Header } from '../../../atoms/Header';
import { MovieCard } from '../../../atoms/MovieCard';
import { RootMachineProvider } from '../../../module/root.machine';

const data = [
  {
    title: 'Reprendre avec le profil de Thomas',
    dataFilter: (movie: any) => movie.progress > 0,
  },
  {
    title: 'Ma Liste',
    dataFilter: (movie: any) => movie.myList,
  },
  {
    title: 'Téléchargements',
    dataFilter: (movie: any) => movie.downloaded,
  },
  {
    title: 'Découvrir',
    dataFilter: (movie: any) => movie.progress === 0,
  },
];

export const HomeScreen = observer(() => {
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
            <SafeAreaView style={{ position: 'absolute', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10,
                }}
              >
                <TouchableOpacity onPress={() => send('MENU_PRESS')}>
                  <Icon name="menu" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => send('SEARCH_PRESS')}>
                  <Icon name="magnifier" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
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
});

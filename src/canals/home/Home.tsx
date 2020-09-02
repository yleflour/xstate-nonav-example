import React, { useContext } from 'react';
import { Canal, Screen, transition } from 'react-nonav';
import { StyleSheet, View } from 'react-native';

import { TabBar } from '../../atoms/TabBar';

import { HomeScreen } from './screens/HomeScreen';
import { DownloadScreen } from './screens/DownloadScreen';
import { BurgerMenuScreen } from './screens/BurgerMenuScreen';
import { RootMachineProvider } from '../../module/root.machine';

export const Home = () => {
  // @ts-ignore
  const [current, send] = useContext(RootMachineProvider);
  return (
    <View style={StyleSheet.absoluteFill}>
      <Canal style={{ flex: 1 }}>
        <Screen
          name="Home"
          Component={HomeScreen}
          visible={current.matches('explorer.main.home')}
          Transitioner={transition.Fade}
        />
        <Screen
          name="Downloads"
          Component={DownloadScreen}
          visible={current.matches('explorer.main.downloads')}
          onBack={() => send('BACK_PRESS')}
          Transitioner={transition.Fade}
        />
        <Screen
          name="BurgerMenu"
          key="BurgerMenu"
          Component={BurgerMenuScreen}
          visible={current.matches('explorer.burgerMenu.open')}
          Transitioner={transition.BurgerMenuLeft}
          onBack={() => send('BACK_PRESS')}
          isFullScreen
        />
      </Canal>
      <TabBar
        items={[
          {
            iconName: 'home',
            title: 'Accueil',
            selected: current.matches('explorer.main.home'),
            onPress: () => send('HOME_PRESS'),
          },
          {
            iconName: 'magnifier',
            title: 'Rechercher',
            selected: false,
            onPress: () => send('SEARCH_PRESS'),
          },
          {
            iconName: 'arrow-down-circle',
            title: 'Téléchargements',
            selected: current.matches('explorer.main.downloads'),
            onPress: () => send('DOWNLOADS_PRESS'),
          },
        ]}
      />
    </View>
  );
};

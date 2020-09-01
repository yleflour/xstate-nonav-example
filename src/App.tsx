import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { FullScreenPortal, Canal, Screen, transition } from 'react-nonav';
import { useMachine } from '@xstate/react';
import { Home } from './canals/home/Home';
import { Player } from './canals/player/Player';
import { observer } from 'mobx-react';
import { PlayerModule } from './module/PlayerModule';
import { Search } from './canals/search/Search';
import { rootMachine, RootMachineProvider } from './module/root.machine';

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#111111',
    flex: 1,
  },
});

console.disableYellowBox = true;

export const App = observer(() => {
  const [current, send] = useMachine(rootMachine);

  return (
    <RootMachineProvider.Provider value={[current, send]}>
      <FullScreenPortal>
        <StatusBar barStyle="light-content" backgroundColor="#111111" />
        <Canal style={styles.appContainer}>
          <Screen name="Home" Component={Home} visible />
          <Screen
            name="Player"
            Transitioner={transition.SlideUp}
            Component={Player}
            visible={current.matches('player.playing')}
          />
          <Search />
        </Canal>
      </FullScreenPortal>
    </RootMachineProvider.Provider>
  );
});

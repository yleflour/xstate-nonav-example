import React, { useContext } from 'react';
import { Canal, Screen, transition } from 'react-nonav';
import { RemoteControlScreen } from './screens/RemoteControlScreen';
import { OnScreenPlayerScreen } from './screens/OnScreenPlayerScreen';
import { ConnectivityModule } from '../../module/ConnectivityModule';
import { RootMachineProvider } from '../../module/root.machine';
import { debug } from 'react-native-reanimated';

export const PlayerCanal = () => {
  const [current, send] = useContext(RootMachineProvider);
  const currentMovie = current.context.currentMovie;

  return (
    <Canal style={{ flex: 1 }}>
      <Screen
        visible={
          current.matches('player.playing') &&
          !ConnectivityModule.isConnectedToChromeCast //TODO
        }
        name="OnScreenPlayer"
        Component={OnScreenPlayerScreen}
        props={{ movie: currentMovie }}
        Transitioner={transition.Fade}
      />
      <Screen
        visible={
          current.matches('player.playing') &&
          ConnectivityModule.isConnectedToChromeCast //TODO
        }
        name="RemoteControl"
        Component={RemoteControlScreen}
        props={{ movie: currentMovie }}
        Transitioner={transition.Fade}
      />
    </Canal>
  );
};

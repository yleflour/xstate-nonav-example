import React, { useContext } from 'react';
import { Canal, Screen, transition } from 'react-nonav';
import { RemoteControlScreen } from './screens/RemoteControlScreen';
import { OnScreenPlayerScreen } from './screens/OnScreenPlayerScreen';
import { RootMachineProvider } from '../../module/root.machine';

export const PlayerCanal = () => {
  // @ts-ignore
  const [current, send] = useContext(RootMachineProvider);
  const currentMovie = current.context.currentMovie;

  return (
    <Canal style={{ flex: 1 }}>
      <Screen
        visible={current.matches('player.playing')}
        name="OnScreenPlayer"
        Component={OnScreenPlayerScreen}
        props={{ movie: currentMovie }}
        Transitioner={transition.Fade}
      />
      <Screen
        visible={current.matches('player.playing.remote')}
        name="RemoteControl"
        Component={RemoteControlScreen}
        props={{ movie: currentMovie }}
        Transitioner={transition.Fade}
      />
    </Canal>
  );
};

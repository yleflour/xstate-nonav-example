import React, { useContext } from 'react';
import { Canal, Screen } from 'react-nonav';
import { StyleSheet, View } from 'react-native';
import { PlayerCanal } from './PlayerCanal';
import { PlayerTransitioner } from './transitions/PlayerTransitioner';
import { RootMachineProvider } from '../../module/root.machine';

export const Player = () => {
  // @ts-ignore
  const [current, send] = useContext(RootMachineProvider);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Canal style={{ flex: 1 }}>
        <Screen
          name="PlayerCanal"
          visible={current.matches('player.playing')}
          Component={PlayerCanal}
          Transitioner={PlayerTransitioner}
          onBack={() => send('BACK_PRESS')}
        />
      </Canal>
    </View>
  );
};

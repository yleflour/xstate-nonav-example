import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { View, TouchableOpacity } from 'react-native';
import { RootMachineProvider } from '../../../module/root.machine';

export const RemoteControlScreen = () => {
  const [current, send] = useContext(RootMachineProvider);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <TouchableOpacity onPress={() => send('MOVIE_STOP')}>
        <Icon name="control-pause" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Icon name="control-play" size={24} color="#FFFFFF" />
      <Icon name="control-end" size={24} color="#FFFFFF" />
    </View>
  );
};

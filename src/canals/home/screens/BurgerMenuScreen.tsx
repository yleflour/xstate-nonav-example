import React, { useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { RootMachineProvider } from '../../../module/root.machine';

export const BurgerMenuScreen = () => {
  // @ts-ignore
  const [current, send] = useContext(RootMachineProvider);
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <TouchableOpacity
        style={{ paddingLeft: 10 }}
        onPress={() => {
          send('DOWNLOADS_PRESS');
        }}
      >
        <Text style={{ padding: 10, fontSize: 16 }}>Téléchargements</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

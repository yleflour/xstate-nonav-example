import React, { useContext } from 'react';
import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { RootMachineProvider } from '../../../module/root.machine';

export const SearchScreen = () => {
  // @ts-ignore
  const [current, send] = useContext(RootMachineProvider);

  return (
    <View style={{ backgroundColor: '#000000', flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => send('SEARCH_CANCEL')}
            style={{ margin: 10 }}
          >
            <Icon name="close" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#222222',
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginRight: 10,
              borderRadius: 15,
              color: '#FFFFFF',
            }}
            placeholder="Search"
            placeholderTextColor="#CCCCCC"
            autoFocus
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

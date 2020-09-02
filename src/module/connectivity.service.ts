import NetInfo from '@react-native-community/netinfo';

// @ts-ignore
export const connectivityService = (context, event) => (send, onReceive) => {
  const unsubscribe = NetInfo.addEventListener((status) => {
    if (status.isConnected) send('NETWORK_CONNECT');
    else send('NETWORK_DISCONNECT');
  });

  return unsubscribe;
};

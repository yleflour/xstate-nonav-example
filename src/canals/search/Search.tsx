import React, { useContext } from 'react';
import { Canal, Screen, transition } from 'react-nonav';
import { observer } from 'mobx-react';
import { SearchScreen } from './screens/SearchScreen';
import { RootMachineProvider } from '../../module/root.machine';

export const Search = observer(() => {
  const [current, send] = useContext(RootMachineProvider);

  return (
    <Canal>
      <Screen
        isFullScreen
        name="Search"
        key="Search"
        visible={current.matches('explorer.search.open')}
        Component={SearchScreen}
        Transitioner={transition.FadeDown}
        onBack={() => send('explorer.search.cancel')}
      />
    </Canal>
  );
});

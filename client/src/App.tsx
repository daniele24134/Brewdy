import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator, SearchStackScreen } from './screens/BottomTabs.navigator';
import { StatusBar } from 'react-native';



export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
      {/* <SearchStackScreen /> */}
      <StatusBar barStyle={'light-content'}/>
    </NavigationContainer>
  );
};



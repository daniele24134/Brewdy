import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { StatusBar } from 'react-native';


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
      <StatusBar barStyle={'light-content'}/>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});

export default App;
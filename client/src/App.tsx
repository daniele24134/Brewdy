import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { StatusBar } from 'react-native';
import { UserProvider } from './User.provider';
import { AuthTabsNavigator } from './screens/AuthTabs.navigator';
import { useUserContext } from './User.provider';
import { Platform, UIManager } from 'react-native';
import { PubsProvider } from './PubsProvider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App: React.FC = () => {

    
  return (
    <UserProvider>
      <DashBoard />
    </UserProvider>
      
  );
};

const DashBoard:React.FC = () => {
  const UserContext = useUserContext();

  const AppLogged = (
    <PubsProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
        <StatusBar barStyle={'light-content'} />
      </NavigationContainer>
    </PubsProvider>
  );

  const AppNotLogged = (
    <NavigationContainer>
      <AuthTabsNavigator />
      <StatusBar barStyle={'light-content'} />
    </NavigationContainer>
  );


  return (
    <>
      {UserContext.isLogged ?
        AppLogged : AppNotLogged
      }
    </>
  );
}



import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator, SearchStackScreen } from './screens/BottomTabs.navigator';
import { StatusBar } from 'react-native';
import { UserProvider } from './User.provider';
import { Text } from 'react-native';
import { AuthTabsNavigator } from './screens/AuthTabs.navigator';
import { useUserContext } from './User.provider';

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
    <NavigationContainer>
      <BottomTabsNavigator />
      <StatusBar barStyle={'light-content'} />
    </NavigationContainer>
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



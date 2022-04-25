import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { StatusBar } from 'react-native';
import { UserProvider } from './User.provider';
import { AuthTabsNavigator } from './screens/AuthTabs.navigator';
import { useUserContext } from './User.provider';
import { Platform, UIManager } from 'react-native';
import { PubsProvider } from './PubsProvider';
import { ThemeProvider, useThemeContext } from './Theme.provider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CustomStatusBar = () => {
  const { isDark } = useThemeContext();

  return (
  <>{ !isDark ? 
    <StatusBar barStyle={'light-content'} /> :
    <StatusBar barStyle={"dark-content"} />
  }</>
  );
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
    <ThemeProvider>
      <PubsProvider>
        <NavigationContainer>
          <BottomTabsNavigator />
          <CustomStatusBar />
        </NavigationContainer>
      </PubsProvider>
    </ThemeProvider>

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



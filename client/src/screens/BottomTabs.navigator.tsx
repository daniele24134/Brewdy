import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home.screen';
import { Profile } from './Profile.screen';
import { Search } from './Search.screen';
import { theme } from '../theme';
import { HomeIcon, SearchIcon, UserIcon } from '../components/Icons';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: theme.header,
        },
        headerTitleStyle: {
          color: theme.textDark,
          fontSize:24
        },
        tabBarStyle:{
          backgroundColor: theme.header,
        },

        tabBarActiveTintColor: theme.buttonColor,
        tabBarInactiveTintColor: theme.bgLight,

        tabBarIcon: ({color, size}) => {
          if(route.name === 'Home') {
            return <HomeIcon color={color} size={size}/>
          }
          if (route.name === 'Search') {
            return <SearchIcon color={color} size={size} />
          }
          if (route.name === 'Profile') {
            return <UserIcon color={color} size={size} />
          }
        }
      })}
    >
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="Search" component={Search} />
      <BottomTabs.Screen name="Profile" component={Profile} />
    </BottomTabs.Navigator>
  );
};

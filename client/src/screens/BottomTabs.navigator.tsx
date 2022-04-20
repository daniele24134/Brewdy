import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home.screen';
import { Profile } from './Profile.screen';
import { Search } from './Search.screen';
import { theme } from '../theme';
import { HomeIcon, SearchIcon, UserIcon } from '../components/Icons';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBeerList } from './SearchBeerList.screen';
import { BeerDetail } from './Beer.screen';


const SearchStack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={() => ({
    
  })}>
    <SearchStack.Screen name="SearchStack"
      component={Search}
      options={{
        headerShown: false
      }}
    />
    <SearchStack.Screen name="SearchBeerList"
      component={SearchBeerList}
      options={{
        title:'',
        headerStyle: {
          backgroundColor: theme.bgDark
        },
        headerBackTitle: '',
        headerBackTitleStyle: {color: theme.buttonColor}
      }}
    />
    <SearchStack.Screen name="Beer"
      component={BeerDetail}
      options={{
        headerShown: false,
        headerBackTitle: '',
        headerBackTitleStyle: { color: theme.buttonColor }
      }}
    />
  </SearchStack.Navigator>
)

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
      <BottomTabs.Screen name="Search" component={SearchStackScreen} />
      <BottomTabs.Screen name="Profile" component={Profile} />
    </BottomTabs.Navigator>
  );
};



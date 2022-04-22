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
import { BeerList } from './BeerList.screen';
import { WishList } from './WishList.screen';

const SearchStack = createStackNavigator();
const RandomStack = createStackNavigator();
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
        headerBackTitleStyle: {color: theme.buttonColor},
        animationTypeForReplace: 'pop'
      }}
    />
    <SearchStack.Screen name="Beer"
      component={BeerDetail}
      options={{
        headerTitle: '',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: theme.bgDark
        },
        headerBackTitleStyle: { color: theme.buttonColor },
        animationTypeForReplace: 'pop'
      }}
    />
  </SearchStack.Navigator>
)


export const RandomStackScreen:React.FC = () => {
  return (
    <RandomStack.Navigator>
      <RandomStack.Screen 
        name='HomePage'
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <RandomStack.Screen
        name='RandomBeer'
        component={BeerDetail}
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerStyle: {
          backgroundColor: theme.bgDark,
        },
        animationTypeForReplace: 'pop',
        headerBackTitleStyle: { color: theme.buttonColor }
        }}
      />
    </RandomStack.Navigator>
  );
}


const BeerListStack = createStackNavigator();

const BeerListStackScreen: React.FC = () => {
  return (
    <BeerListStack.Navigator defaultScreenOptions={{}}>
      <BeerListStack.Screen name="User" component={Profile}
        options={{
          headerShown: false
        }}
      />
      <BeerListStack.Screen name="BeerList" 
        component={BeerList} 
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: theme.bgDark
          },
          headerBackTitleStyle: { color: theme.buttonColor },
          animationTypeForReplace: 'pop'
        }}
      />
      <BeerListStack.Screen name="WishList"
        component={WishList}
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: theme.bgDark
          },
          headerBackTitleStyle: { color: theme.buttonColor },
          animationTypeForReplace: 'pop'
        }}
      />
    </BeerListStack.Navigator>

  );
}


export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: theme.header,
        },
        headerTitleStyle: {
          color: theme.buttonColor,
          fontSize:30,
          marginBottom: 10,
          fontWeight: 'bold'
        },
        tabBarStyle:{
          backgroundColor: theme.header,
        },
        headerTitle: 'Brewdy',

        tabBarActiveTintColor: theme.buttonColor,
        tabBarInactiveTintColor: theme.bgLight,
        tabBarItemStyle: {marginTop:10, height: 45},

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
      <BottomTabs.Screen name="Home" component={RandomStackScreen} />
      <BottomTabs.Screen name="Search" component={SearchStackScreen} />
      <BottomTabs.Screen name="Profile" component={BeerListStackScreen} />
    </BottomTabs.Navigator>
  );
};



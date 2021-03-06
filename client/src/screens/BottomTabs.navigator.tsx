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
import { PubForm } from './PubForm';
import { ChoosePub } from './ChoosePub';
import { PubScreen } from './Pub.screen';
import { useThemeContext } from '../Theme.provider';

const SearchStack = createStackNavigator();
const RandomStack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

export const SearchStackScreen = () => {
  const { themeStyle } = useThemeContext();

  return (
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
          backgroundColor: themeStyle.headerbg
        },
        headerBackTitle: '',
        headerBackTitleStyle: {
          color: themeStyle.blue,
          fontFamily: theme.fontRegular
        },
        animationTypeForReplace: 'pop'
      }}
    />
    <SearchStack.Screen name="Beer"
      component={BeerDetail}
      options={{
        headerTitle: '',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor: themeStyle.headerbg
        },
        headerBackTitleStyle: { 
          color: themeStyle.blue,
          fontFamily: theme.fontRegular
        },
        animationTypeForReplace: 'pop'
      }}
    />
  </SearchStack.Navigator>
  );
}


export const RandomStackScreen:React.FC = () => {

  const { themeStyle } = useThemeContext();

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
          backgroundColor: themeStyle.headerbg,
        },
        animationTypeForReplace: 'pop',
        headerBackTitleStyle: { 
          color: themeStyle.blue,
          fontFamily: theme.fontRegular
        }
        }}
      />
    </RandomStack.Navigator>
  );
}


const BeerListStack = createStackNavigator();

const BeerListStackScreen: React.FC = () => {

  const { themeStyle } = useThemeContext();

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
          headerTitle: 'Beer List',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: themeStyle.headerbg,
          },
          headerTitleStyle:{
            color: themeStyle.text,
            fontSize: 24,
            fontFamily: theme.fontBold
          },
          headerBackTitleStyle: { 
            color: themeStyle.blue,
            fontFamily: theme.fontRegular
          },
          animationTypeForReplace: 'pop'
        }}
      />
      <BeerListStack.Screen
        name={'ChoosePub'}
        component={ChoosePub}
       
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: themeStyle.headerbg,
          },
          headerTitleStyle: {
            color: themeStyle.text,
            fontSize: 24,
            fontFamily: theme.fontBold
          },
          headerBackTitleStyle: {
            color: themeStyle.blue,
            fontFamily: theme.fontRegular
          },
          presentation: 'modal'
        }}
      />
      <BeerListStack.Screen 
        component={PubForm} 
        name={"PubForm"}
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: themeStyle.headerbg,
          },
          headerTitleStyle: {
            color: themeStyle.text,
            fontSize: 24,
            fontFamily: theme.fontBold
          },
          headerBackTitleStyle: {
            color: themeStyle.blue,
            fontFamily: theme.fontRegular
          },
        }}
      />
      <BeerListStack.Screen
        component={PubScreen}
        name={"Pub"}
        options={{
          headerTitle: '',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: themeStyle.headerbg,
          },
          headerTitleStyle: {
            color: themeStyle.text,
            fontSize: 24,
            fontFamily: theme.fontBold
          },
          headerBackTitleStyle: {
            color: themeStyle.blue,
            fontFamily: theme.fontRegular
          },
        }}
      />
      <BeerListStack.Screen name="WishList"
        component={WishList}
        options={{
          headerTitle: 'Wish List',
          headerTitleStyle:{
            fontWeight: '600',
            color: themeStyle.text,
            fontSize: 24,
            fontFamily: theme.fontBold
          },
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: themeStyle.headerbg
          },
          headerBackTitleStyle: { 
            color: themeStyle.blue,
            fontFamily: theme.fontRegular
          },
          animationTypeForReplace: 'pop'
        }}
      />
    </BeerListStack.Navigator>

  );
}

export const BottomTabsNavigator: React.FC = () => {
  const { themeStyle } = useThemeContext();

  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: themeStyle.headerbg,
        },
        headerTitleStyle: {
          color: themeStyle.blue,
          fontSize:30,
          marginBottom: 10,
          fontFamily: theme.fontBold
        },
        tabBarStyle:{
          backgroundColor: themeStyle.headerbg,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fontSemiBold
        },
        headerTitle: 'Brewdy',

        tabBarActiveTintColor: themeStyle.blue,
        tabBarInactiveTintColor: themeStyle.text,
        tabBarItemStyle: {marginTop:10, height: 45},

        tabBarIcon: ({color, size}) => {
          if(route.name === 'Home') {
            return <HomeIcon color={color} size={size}/>
          }
          if (route.name === 'Search') {
            return <SearchIcon color={color} size={size+2} />
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



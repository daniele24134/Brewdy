import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../theme';
import { createStackNavigator } from '@react-navigation/stack';
import { Signin } from './Login.screen';
import { Signup } from './Signup.screen';

const AuthTabs = createStackNavigator();

export const AuthTabsNavigator: React.FC = () => {
  return (
    <AuthTabs.Navigator
      screenOptions={() => ({
        headerShown: false
      })}
    >
      <AuthTabs.Screen name="Signin" component={Signin} />
      <AuthTabs.Screen name="Signup" component={Signup} />
    </AuthTabs.Navigator>
  );
};
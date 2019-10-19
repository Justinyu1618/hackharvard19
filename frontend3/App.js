import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import AddPage from './components/addpage';
import Rings from './components/rings';
import Profile from './components/profile';
import Login from './components/login';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';



global.allCircles = [];


const navigationOptions = {
header: null,
};

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: navigationOptions,
  },
  Home: {
    screen: Rings,
    navigationOptions: navigationOptions,
  },
  UserPage: {
    screen: Profile,
    navigationOptions: navigationOptions,
  },
  initialRouteName: "Home",


});

export default createAppContainer(AppNavigator);

import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import AddPage from './components/addpage';
import Rings from './components/rings';
import Profile from './components/profile';
import Login from './components/login';
import Main from './components/main';
import Posts from './components/posts';
import MeetFeed from './components/meetfeed';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';


global.token = "";

global.allCircles = [];


const navigationOptions = {
header: null,
};

const AppNavigator = createStackNavigator({
  Login: {
    screen: MeetFeed,
    navigationOptions: navigationOptions,
  },
  Home: {
    screen: Rings,
    navigationOptions: navigationOptions,
  },
  Main: {
    screen: Main,
    navigationOptions: navigationOptions,
  },
  Posts: {
    screen: Posts,
    navigationOptions: navigationOptions,
  },
  UserPage: {
    screen: Profile,
    navigationOptions: navigationOptions,
  },
  initialRouteName: "Home",


});

export default createAppContainer(AppNavigator);

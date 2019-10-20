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

import * as firebase from "firebase/app"
var config = {
  apiKey: "AIzaSyAChx2G-bxQm4SBXcEel0pk6_E_S382ypQ",
  authDomain: "hackharvard19.firebaseapp.com",
  // databaseURL: "https://databaseName.firebaseio.com",
  // storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();


global.token = "";

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

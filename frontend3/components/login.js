import React, {Component} from 'react'
import {AppRegistry, Keyboard, Text, View, ReactBox, StyleSheet, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'
// import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'
import { LinearGradient } from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window');

export default class Login extends Component {

  state = {

  }

  toHome(){
    this.props.navigation.navigate({routeName: "Main"});
  }

  render() {
      return (
        <View style={styles.mainback}>
          <LinearGradient
            colors={["rgb(146, 232, 198)", "rgb(146, 232, 198)", "white", ]}
            style={styles.gradback}
          >
          <View style={styles.ttop}>
          <Text style={styles.maintitle}>Bump</Text><Text style={styles.ttwo}>App</Text>
          </View>

          <View style={styles.gradview}>
            <Image style={styles.backmeet} source={require('./wetalk2.png')}/>
          </View>

          <Text style={styles.letsget}>- Let's Get Connecting -</Text>

          <View style={styles.signwith}>

          <TouchableOpacity onPress={this.toHome.bind(this)} activeOpacity={1} style={{...styles.syncbtn, backgroundColor: "white"}}>
            <Image style={styles.syncimg} source={require('../components/glogo.png')}/>
            <Text style={{...styles.synctext, color: "rgba(0,0,0,0.3)"}}>Sign in with Google</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.toHome.bind(this)} activeOpacity={1} style={{...styles.syncbtn, backgroundColor: "white", marginTop: 40}}>
            <Image style={{...styles.syncimg, width: 3456*0.0098, height: 3960*0.0098, marginLeft: -15, opacity: 0.8}} source={require('../components/applg.png')}/>
            <Text style={{...styles.synctext, color: "rgba(0,0,0,0.3)"}}>Sign in with Apple</Text>
          </TouchableOpacity>


          </View>

          </LinearGradient>
        </View>

      )

  }

}


const styles = StyleSheet.create({
  gradback: {
    width: "100%",
    height: "100%",
  },

  gradview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  mainback: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  backmeet: {
    width: 1400*0.2575,
    height: 1200*0.2575,
    marginTop: 55,
  },

  maintitle: {
      color: "white",
      fontSize: 70,
      fontWeight: '800',
      textAlign: "center",
      marginTop: 80,
      marginBottom: -27.5,
  },

  ttop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: 10,
  },

  ttwo: {
    color: "white",
    fontSize: 70,
    fontWeight: '200',
    textAlign: "center",
    marginTop: 80,
    opacity: 0.4,
    marginBottom: -27.5,
  },

  letsget: {
    color: "white",
    textAlign: "center",
    marginTop: 43,
    fontSize: 30,
    fontWeight: "300"
  },

  signwith: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  syncbtn: {
      width: 300,
      height: 60,
      borderRadius: 8,
      backgroundColor: "#1DA1F2",
      display: "flex",
      flexDirection: "row",
      shadowColor: "rgb(146, 232, 198)",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.8,
      shadowRadius: 40,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 57.5,
      opacity: 0.8,


  },

  syncimg: {
    width: 34,
    height: 34,
    marginRight: 7.5*1.15,
  },

  synctext: {
    color: "white",
    fontWeight: "400",
    fontSize: 21.5,
    marginLeft: 7.5*1.15,
  },



});

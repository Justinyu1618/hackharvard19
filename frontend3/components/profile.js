import React, {Component} from 'react'
import {AppRegistry, Keyboard, Text, View, ReactBox, StyleSheet, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'


const {width, height} = Dimensions.get('window');

export default class Profile extends Component {

  state = {

  }

  render(){
    return(
        <View style={styles.container}>
          <View style={styles.topwrap}>
            <Image style={styles.ptop} source={require('../components/0.jpg')}/>
            <Image style={styles.setbtn} source={require('../components/settings.png')}/>
          </View>
          <Text style={styles.nameText}>Samuel Miserendino</Text>
          <View style={styles.mysettings}>
            <Text style={styles.stext}>Customize swap settings »</Text>
          </View>
          <View style={styles.emptylist}>
            <Image style={styles.noimg} source={require('../components/ghost2.png')}/>
            <Text style={styles.nset}>No connections yet!</Text>
          </View>
        </View>
    )

  }


}



const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  topwrap: {
    marginTop: 65,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

  },

  ptop: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginLeft: 35,
  },

  nameText: {
    marginLeft: 37.5,
    fontSize: 30,
    fontWeight: '300',
    color: "rgba(0,0,0,.3)",
    marginTop: 24,
  },

  mysettings: {
    width: width,
    height: 70,
    shadowColor: "gray",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOpacity: 0.11,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },

  stext: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(0,0,0,0.2)"
  },

  emptylist: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 140,
      opacity: 0.4,
  },

  noimg: {
    width: 135,
    height: 135,
  },

  nset: {
    fontSize: 30,
    fontWeight: '600',
    color: "rgba(0,0,0,0.2)",
    marginTop: 32.5,
  },

  setbtn: {
    width: 50,
    height: 50,
    marginLeft: 170,
    marginTop: -50,
    opacity: 0.22,

  },

});

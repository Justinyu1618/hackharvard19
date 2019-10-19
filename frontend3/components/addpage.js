import React, {Component} from 'react'
import {AppRegistry, Keyboard, Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'
import { Gyroscope } from 'expo-sensors';
import { material, iOSUIKit } from 'react-native-typography'
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';



const {width, height} = Dimensions.get('window');


export default class AddPage extends Component {

  state = {
      borderColor: new Animated.Value(0),
      mainOpacity: new Animated.Value(0),
  }

  focusHandle(){

        Animated.timing(this.state.borderColor, {
          toValue: 300,
        }).start( () => { //Callback

        });

    }


  render(){

    console.log(this.state.borderColor);

    let dynColor = this.state.borderColor.interpolate({
        inputRange: [0, 300],
        outputRange: ["rgba(0,0,0,0.1)", "rgba(29, 202, 255, 1)"]
    });


    let dynVal = JSON.stringify(dynColor).replace(/"/g, "");




    return (
        <View style={styles.container}>
          <View style={styles.topmain}>
              <View style={styles.toptext}>
                <Text style={styles.siw}>Sign in with</Text>
                <Text style={styles.siwBold}>Twitter</Text>
              </View>
              <Image style={styles.forceMap} source={require('../components/twitter.png')}></Image>

              <Animated.View style={{...styles.tinput, borderColor: dynVal}}>
                    <TextInput onFocus={this.focusHandle.bind(this)} style={styles.mText}></TextInput>
              </Animated.View>
              <Animated.View style={{...styles.tinputLow, borderColor: dynVal}}>
                    <TextInput onFocus={this.focusHandle.bind(this)} style={styles.mText}></TextInput>
              </Animated.View>
          </View>

        </View>
    )

  }

}

const factor = 1.2;
const imgWidth = 250;

const styles = StyleSheet.create({

      container: {
        width: "100%",
        height: "100%",
      },

      topmain: {
        backgroundColor: "#1dcaff",
        width: "100%",
        height: 300,
      },

      toptext: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 105,
      },

      siw: {
        color: "white",
        fontSize: 30 * factor,
        fontWeight: '200',

      },

      siwBold: {
        fontWeight: '400',
        color: "white",
        fontSize: 30 * factor,
        marginLeft: 5 * factor
      },

      forceMap: {
        width: imgWidth,
        height: imgWidth,
        marginLeft: (width-imgWidth)/2,
        marginTop: 10,
        marginBottom: -80,
      },

      tinput: {
        borderWidth: 2,
        width: "90%",
        marginLeft: "5%",
        height: 65,
        marginTop: 60,
      },

      tinputLow: {
        borderWidth: 2,
        width: "90%",
        marginLeft: "5%",
        height: 65,
        marginTop: 60,
      },

      mText: {
        width: "100%",
        height: "100%",
        fontSize: 23.5,
        color: "rgba(0,0,0,0.5)",
        fontWeight: "300",
        marginLeft: 20
      }




});

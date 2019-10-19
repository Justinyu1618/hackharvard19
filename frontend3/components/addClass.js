import React, {Component} from 'react'
import {AppRegistry, Keyboard, Text, View, Button, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'
import { Gyroscope } from 'expo-sensors';
import { material, iOSUIKit } from 'react-native-typography'
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';



const {width, height} = Dimensions.get('window');

const modalHeight = height*1;
const modalWidth = width*1;
const topOffset = 0; //79

export default class Modal extends Component {

  state = {
    fontsLoaded: false,
    modalOpacity: new Animated.Value(0),
    displayVal: "none",

  }

  async componentDidMount(){
    await Font.loadAsync({
      'norms-bold': require('../components/TTNorms-Bold.ttf'),
      'norms-medium': require('../components/TTNorms-Medium.ttf'),
      'norms-regular': require('../components/TTNorms-Regular.ttf'),
    });
    this.setState({fontsLoaded: true});


  }

  closeModal(){
      Animated.timing(this.state.modalOpacity, {
        toValue: 0,
        duration: 100,
      }).start(() => {
        this.setState({displayVal: "inline-block"});
        for (let circ of global.allCircles){
          circ.setState({cirIndex: 1});
        }
      });
  }


  openModal(){
      Animated.timing(this.state.modalOpacity, {
        toValue: 1,
        duration: 100,
      }).start(() => {

      });
  }

  renderUpdate(){

  }

  updateGyro(){

  }


  render(){

    let {displayVal} = this.state;

    return (
      <View style={{...styles.backContainer, opacity: this.state.modalOpacity._value}}>
        <View style={styles.modalWrap}>
          <Text style={{...styles.socialWrap}}>Add a Social Media</Text>

              <View style={{width: 320, height: 1, backgroundColor: "rgba(0,0,0,0.5)", marginTop: 5}}>
              </View>

            <TouchableOpacity style={{...styles.syncbtn, display: displayVal }}>
              <Image style={styles.syncimg} source={require('../components/twitter.png')}/>
              <Text style={styles.synctext}>Login with Twitter</Text>
            </TouchableOpacity>



            <TouchableOpacity style={{...styles.syncbtn, backgroundColor: "#3b5998", display: displayVal}}>
              <Image style={styles.syncimg} source={require('../components/facebook-logo.png')}/>
              <Text style={styles.synctext}>Login with FaceBook</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <LinearGradient
            colors={['#fdf497', '#fd5949', '#d6249f', '#285AEB']}
            start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
            style={{...styles.syncbtn}}>
              <Image style={styles.syncimg} source={require('../components/instagram-logo.png')}/>
              <Text style={styles.synctext}>Login with Instagram</Text>
            </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.syncbtn, backgroundColor: "#0077B5", display: displayVal}}>
              <Image style={{...styles.syncimg, marginTop: -7.5}} source={require('../components/linkedin-logo.png')}/>
              <Text style={styles.synctext}>Login with LinkedIn</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{...styles.syncbtn, backgroundColor: "#fffc00", display: displayVal}}>
              <Image style={{...styles.syncimg}} source={require('../components/snap2chat.png')}/>
              <Text style={{...styles.synctext, color: "rgba(0,0,0,0.65)"}}>Login with Snapchat</Text>
            </TouchableOpacity>



          <TouchableOpacity style={{...styles.syncbtn, backgroundColor: "rgba(51, 51, 51, 1)", display: displayVal}}>
            <Image style={{...styles.syncimg}} source={require('../components/github-logo.png')}/>
            <Text style={styles.synctext}>Login with GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.closeModal.bind(this)}>
            <Text style={styles.closeText}>- Exit Menu -</Text>
          </TouchableOpacity>

        </View>
      </View>
    )

  }

}

const styles = StyleSheet.create({

  modalWrap: {
      width: modalWidth,
      height: modalHeight,
      backgroundColor: "white",
      top: (height-modalHeight)/2 - topOffset,
      left: (width-modalWidth)/2,
      borderRadius: 15,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 1,
      shadowColor: "rgba(0,0,0,0.1)",
      shadowRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
  },

  backContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
  },

  socialWrap: {
    fontSize: 32.5,
    marginTop: 93,
    color: "rgba(0,0,0,0.8)",
    fontWeight: '300',
    marginBottom: 25,

  },

  close: {
    opacity: 0.2,
    width: 33,
    height: 33,
    marginTop: 20,
    marginRight: 22.5,
  },

  imgtop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },

  syncbtn: {
      width: 300,
      height: 60,
      borderRadius: 8,
      backgroundColor: "#1DA1F2",
      display: "flex",
      flexDirection: "row",
      shadowColor: "black",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 32.5,

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

  closeText: {
    fontSize: 25,
    marginTop: 50,
    fontWeight: '300',
    color: "rgba(0,0,0,0.4)",
  }

});

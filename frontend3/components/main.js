import React, {Component} from 'react'
import {AppRegistry, Keyboard, Text, View, ReactBox, StyleSheet, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'

import { PanGestureHandler, FlingGestureHandler, Directions } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

/*        /*<View style={styles.emptylist}>
          <Image style={styles.noimg} source={require('../components/ghost2.png')}/>
          <Text style={styles.nset}>No connections yet!</Text>
        </View>

*/


export default class Profile extends Component {

  state = {

  }

  toPage(){
          this.props.navigation.navigate({routeName: "Home"});

  }

  render(){
    return(
        <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={this.toPage.bind(this)}>
        <View style={styles.container}>


          <View style={styles.topwrap}>
            <Image style={styles.companylogo} source={require('./bglt.png')}/>
            <View style={styles.topnote}>
              <Text style={styles.l1}>Connect</Text>
              <Text style={styles.l2}>Home</Text>
            </View>
            <Image style={styles.bstngs} source={require('./sbtn.png')}/>
          </View>


          <Text style={styles.wback}>Welcome Back,</Text>
          <View style={styles.bwarp}>
          <View style={styles.bgclr}>
            <Image style={styles.imgback} source={require('./0.jpg')}/>
          </View>
          </View>
          <Text style={styles.wname}>Justin Andrew</Text>
          <View style={styles.lowbar}></View>
          <View style={{...styles.todayiwant, marginTop: 60}}>
            <View style={styles.addnew}>

            </View>
          </View>



          <View style={{...styles.todayiwant, bottom: 75, marginLeft: 50, opacity: 0.6, zIndex: -1, position: "absolute", marginTop: 60}}>
          </View>


        </View>

      </FlingGestureHandler>

    )

  }


}



const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  lowbar: {
    width: "100%",
    height: 5,
    backgroundColor: "rgba(111, 217, 174,0.2)",
    marginTop: 42.5,
    borderRadius: 10,

  },

  topwrap: {
    marginTop: 65,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOpacity: 0.11,
    paddingBottom: 22.5,
    borderRadius: 10,

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

  companylogo: {
    width: 368/5,
    height: 206/5,
    marginLeft: 20,
    marginTop: -10,
  },

  l1: {
    fontSize: 25,
    opacity: 0.2,
    fontWeight: "600",
    marginTop: -10,


  },

  l2: {
    fontSize: 25,
    opacity: 0.2,
    fontWeight: "200",
    marginLeft: 2,
    marginTop: -10,
  },

  topnote: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "rgb(111, 217, 174)",
    marginLeft: 32+10
  },

  bstngs: {
    width: 35,
    height: 35,
    marginLeft: 65-10,
    opacity: 0.7,
    marginTop: -8,
  },

  wback: {
    textAlign: "center",
    fontSize: 29,
    opacity: 0.2,
    marginTop: 40,

  },

  wname: {
    textAlign: "center",
    fontSize: 40,
    opacity: 0.3,
    marginTop: 20,
  },

  todayiwant: {
    display: "flex",
    flexDirection: "column",
  },

  imgback: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 5,
},

  bwarp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

  },

  bgclr: {
    shadowColor: "rgb(111, 217, 174)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    backgroundColor: "white",
    borderRadius: 65,
    height: 130,
    width: 130,
    marginTop: 25,
  },

  todaystops: {
    color: "rgba(0,0,0,0.3)",
    textAlign: "center",
    fontSize: 27.5,
    fontWeight: '300',
  },

  todayiwant: {
    width: "85%",
    marginLeft: "7.5%",
    height: 250,
    backgroundColor: "white",
    marginTop: 32.5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.125,
    shadowRadius: 20,
    borderRadius: 15,
  },

  tag: {
    backgroundColor: "rgba(111, 217, 174, 0.8)",
    width: 110,
    height: 40,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 20,

  },

  ttext: {
    color: "white",
    fontSize: 17,
    marginLeft: 25,
  },

  addnew: {
    width: "80%",
    marginLeft: "10%",
    height: 55,
    backgroundColor: "rgba(0,0,0,0.025)",
    borderRadius: 15,
    position: "absolute",
    bottom: 42.5,

  },

});

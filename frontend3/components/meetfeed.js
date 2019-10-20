import React, {Component} from 'react'
import {AppRegistry, FlatList,  Keyboard, Text, View, ReactBox, StyleSheet, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window');

export default class MeetFeed extends Component {

  state = {

  }

  render() {
    return (
      <View style={styles.container}>

      <FlatList
          style={styles.fltlist}

          data={[
            {key: 'Soccer'},
            {key: 'Affirmative Action'},
            {key: 'iOS 13'},
            {key: 'Parenting 😩'},
            {key: 'Books'},
            {key: 'Basketball'},
            {key: 'Chess'},
            {key: 'Startups'},
            {key: 'Religion'},
            {key: 'Blockchain'},
          ]}
          renderItem={({item}) => <View style={styles.imain}>
           <Text style={styles.titem}>{item.key}</Text>
           <Image style={styles.imgmn} source={require('./rcv.png')}/>
         </View>}
        />


      </View>

    )

  }
}



const styles = StyleSheet.create({

  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },

  fltlist: {
    width: "100%",
    height: "100%",
    marginTop: 50,


  },

  imain: {
    width: "100%",
    height: 60,

    marginTop: 20,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.025,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  titem: {
    fontSize: 17.5,
    marginLeft: 12.5,
    color: "rgba(0,0,0,0.6)"
  },

  imgmn: {
    width: 15,
    height: 15,
    marginLeft: 7.5,
    opacity: 0.5,

  },

});

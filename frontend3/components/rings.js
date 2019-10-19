import React, {Component} from 'react'
import {AppRegistry, Keyboard, Text, View, ReactBox, StyleSheet, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'
import { Gyroscope } from 'expo-sensors';
import { PanGestureHandler, FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import Ring from '../components/ringClass';
import Modal from '../components/addClass';


const {width, height} = Dimensions.get('window');

const lowSize = 275;
const topOffset = 10;
const offsetBlock = 7.5;

global.cIdxVal = 3;
global.posRecords = [
    [new Animated.Value(width*0.025+offsetBlock), new Animated.Value(lowSize*0.66+topOffset)],
    [new Animated.Value(width*0.12+offsetBlock), new Animated.Value(lowSize*0.335+topOffset)],
    [new Animated.Value(width*0.5-120/2+offsetBlock), new Animated.Value(lowSize*0.035+topOffset)],
    [new Animated.Value(width-width*0.12-85+offsetBlock), new Animated.Value(lowSize*0.335+topOffset)],
    [new Animated.Value(width-width*0.025-60+offsetBlock), new Animated.Value(lowSize*0.66+topOffset)]
  ]


export default class Rings extends Component {

    state = {
      offsetBlock: 7.5,
      gyro: {
        x: 0,
        y: 0,
        z: 0,
      },
      lastPress: false,
      posVals: [
        [new Animated.Value(width*0.025+offsetBlock), new Animated.Value(lowSize*0.66+topOffset)],
        [new Animated.Value(width*0.12+offsetBlock), new Animated.Value(lowSize*0.335+topOffset)],
        [new Animated.Value(width*0.5-120/2+offsetBlock), new Animated.Value(lowSize*0.035+topOffset)],
        [new Animated.Value(width-width*0.12-85+offsetBlock), new Animated.Value(lowSize*0.335+topOffset)],
        [new Animated.Value(width-width*0.025-60+offsetBlock), new Animated.Value(lowSize*0.66+topOffset)]
      ],
      bgVal: new Animated.Value(0),
      targetVal: 'rgba(29, 202, 255, 1)',
      goneRecords: [false, false, false, false, false],
    }

    componentDidMount(){

    }


  pageTap(){


    if (!this.state.lastPress){
      this.setState({lastPress: new Date().getTime()});
      return;
    }

    let currentPress = new Date().getTime();

    if (currentPress - this.state.lastPress < 200){
      console.log("Double tap!");
      global.allCircles = Object.values(this.refs);
      for (let val of Object.values(this.refs)){
        if (val.openModal){
          console.log("Opening Modal!");
          val.setState({displayVal: "inline-block"});
          val.openModal();
        } else {
          val.setState({cirIndex: -1});
        }
      }
    }

    this.setState({lastPress: new Date().getTime()});

  }

  optSwipe(){


    let {c1, c2, c3, c4, c5} = this;
    let allRefs = [c1, c2, c3, c4, c5];

    for (var i=0;i<allRefs.length;i++){
      if (i<4){
        let xVal = parseFloat(JSON.stringify(allRefs[i+1]["state"]["x"]));
        let yVal = parseFloat(JSON.stringify(allRefs[i+1]["state"]["y"]));
        let bWidth = parseFloat(JSON.stringify(allRefs[i+1]["state"]["ballWidth"]));
        let iWidth = parseFloat(JSON.stringify(allRefs[i+1]["state"]["imageWidth"]));
        let newOp = parseFloat(JSON.stringify(allRefs[i+1]["state"]["itemOp"]));
        if (newOp > 0.9) this.setState({targetVal: allRefs[i].props.bgcolor});
        allRefs[i].moveTo(xVal, yVal, bWidth, iWidth, newOp, i);
      } else {
        let xVal = parseFloat(JSON.stringify(allRefs[0]["state"]["x"]));
        let yVal = parseFloat(JSON.stringify(allRefs[0]["state"]["y"]));
        let bWidth = parseFloat(JSON.stringify(allRefs[0]["state"]["ballWidth"]));
        let iWidth = parseFloat(JSON.stringify(allRefs[0]["state"]["imageWidth"]));
        let newOp = parseFloat(JSON.stringify(allRefs[0]["state"]["itemOp"]));
        if (newOp > 0.9) this.setState({targetVal: allRefs[i].props.bgcolor});
        allRefs[i].moveTo(xVal, yVal, bWidth, iWidth, newOp, i);
      }



    }
  }

  swpUp(){
      let res = this['c'+global.cIdxVal].moveUp(-300);

      this.state.goneRecords[global.xIdxVal-1] = true;

      if (res)  {
      Animated.timing(this.state.bgVal, {
        toValue: 250,
        duration: 300
      }).start(() => {
      });

      setTimeout(() => {
        Animated.timing(this.state.bgVal, {
          toValue: 0,
          duration: 300
        }).start();
      }, 300);
    }
  }

  toPage() {
    this.props.navigation.navigate({routeName: "UserPage"});

  }

  render(){
    /*
    <Modal ref='m1'/>
    <Ring ref='c1' logo={require('../components/twitter.png')} bgcolor={"#1dcaff"}/>
    <Ring ref='c2' logo={require('../components/snapchat.png')} bgcolor={"rgba(255, 251, 0, 0.8);"}/> */


    let bgColor = this.state.bgVal.interpolate({
        inputRange: [0, 500],
        outputRange: ['rgba(255,255,255,1)', this.state.targetVal]
    });

    return (

    <Animated.View style={{...styles.container, backgroundColor: bgColor}}>
    <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={this.toPage.bind(this)}>
    <View style={styles.toptouch}></View>
    </FlingGestureHandler>
    <FlingGestureHandler direction={Directions.UP} onHandlerStateChange={this.swpUp.bind(this)}>
        <PanGestureHandler minDist={50}  onHandlerStateChange={this.optSwipe.bind(this)}>
        <View style={styles.lowback}>
          <Animated.View style={{...styles.dockReady, backgroundColor: bgColor, left: width*0.5-120/2+this.state.offsetBlock, top: lowSize*0.035+topOffset, width: 120, height: 120, borderRadius: 60}}></Animated.View>
          <Ring ref={comp => this.c1 = comp} x={this.state.posVals[0][0]} y={this.state.posVals[0][1]} ballWidth={60} itemOpacity={0.05} logo={require('../components/linkedin-logo.png')} bgcolor={"#0077B5"}/>
          <Ring ref={comp => this.c2 = comp} x={this.state.posVals[1][0]} y={this.state.posVals[1][1]} ballWidth={85} itemOpacity={0.6} logo={require('../components/snapchat.png')} bgcolor={"rgba(255, 251, 0, 0.8);"}/>
          <Ring ref={comp => this.c3 = comp} x={this.state.posVals[2][0]} y={this.state.posVals[2][1]} ballWidth={120} logo={require('../components/twitter.png')} bgcolor={"#1dcaff"}/>
          <Ring ref={comp => this.c4 = comp} x={this.state.posVals[3][0]} y={this.state.posVals[3][1]} ballWidth={85} itemOpacity={0.6} logo={require('../components/facebook-logo.png')} bgcolor={"#3b5998"}/>
          <Ring ref={comp => this.c5 = comp} x={this.state.posVals[4][0]} y={this.state.posVals[4][1]} ballWidth={60} itemOpacity={0.05} logo={require('../components/email.png')} bgcolor={"#73767a"}/>
        </View>
        </PanGestureHandler>
    </FlingGestureHandler>
    </Animated.View>
    )

  }

  componentDidMount(){



    let {c1, c2, c3, c4, c5} = this;
    let allRefs = [c1, c2, c3, c4, c5];


    Gyroscope.isAvailableAsync().then(res => {

      if (res){
        Gyroscope.addListener(result => {
          this.setState({gyro: result});
          //y to the right
          //x towards me
          //z = speed


        for (let val of allRefs){
          val.updateGyro(result);
        }


        })
      }
    })


    setInterval(() => {


      for (let val of allRefs) {

        val.renderUpdate();
      }

    }, 5);

  }

}

const styles = StyleSheet.create({

  toptouch: {
    width: "100%",
    height: 575,
    position: "absolute",

  },

  container: {
    height: "100%",

  },

  lowback: {
    width: "105%",
    marginLeft: "-2.5%",
    height: lowSize + 25,
    backgroundColor: "rgba(0,0,0,0.001)",
    bottom: 0,
    top: height - lowSize - 25,
    zIndex: -1,
    borderColor: "rgba(0,0,0,0.1)",
    borderStyle: "dashed",
    borderWidth: 2,


  },

  dockReady: {
      position: "absolute",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowColor: "#f0ff69",
      shadowOpacity: 0.15,
      shadowRadius: 50,
  }

});

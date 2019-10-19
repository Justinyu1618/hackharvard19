import React, {Component} from 'react'
import {AppRegistry, Keyboard, Text, PanResponder, View, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, PushNotificationIOS, Alert, Platform, Dimensions, Geolocation, Animated} from 'react-native'
import { Gyroscope } from 'expo-sensors';

const {width, height} = Dimensions.get('window');

import Draggable from 'react-native-draggable';

const shrinkFactor = 0.602857142;


export default class Ring extends Component {

    state = {
      x: this.props.x || Math.random()*width,
      y: this.props.y || Math.random()*(height-305),
      velX: 0,
      velY: 0,
      accX: 0,
      accY: 0,
      ballWidth: new Animated.Value(this.props.ballWidth || 140),
      bounce: 0.2,
      pan: new Animated.ValueXY(),
      panSet: false,
      override: false,
      originX: 0,
      originY: 0,
      last100X: [],
      last100Y: [],
      imageWidth: new Animated.Value(this.props.ballWidth/140*82.5),
      expanded: true,
      cirIndex: 0,
      itemOp: new Animated.Value(this.props.itemOpacity || 1),
      isStaged: false,
      blocking: true,
      pureIndex: 2,
    }



    panRes = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove:
        Animated.event([null, {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
      }],
      {
        listener: event => {
            if (this.state.override === false){
                this.setState({originX: this.state.x, originY: this.state.y});
            }
            this.setState({override: true});

        }
      }),

      onPanResponderRelease: (e, gesture) => {
          if (!this.state.isStaged) return;

          this.setState({override: false});
          this.setState({velX: this.state.pan.x._value/12.5, velY: this.state.pan.y._value/12.5});

          var heightLim = 0;


          if (this.state.y > heightLim - this.state.ballWidth._value/2){
            this.setState({expanded: false, isStaged: false});
            this.setState({velX: 0, velY: 0});
            this.setState({accX: 0, accY: 0});



            let tIdx = this.state.pureIndex;
            this.setState({x: global.posRecords[tIdx][0], y: global.posRecords[tIdx][1]});

          } else {


          }
      }

    });

    moveUp(newY){



      if (!this.state.isStaged){

        Animated.timing(this.state.y, {
          toValue: newY,
          duration: 300
        }).start( () => {
        });

        setTimeout(() => {
          this.setState({isStaged: true});
        }, 300);

      } else {
        this.setState({blocking: false});
        this.state.velY = -20;
      }

      return this.state.isStaged;


    }


    moveToSimple(newX, newY){
      Animated.timing(this.state.x, {
        toValue: newX,
        duration: 300
      }).start();

      Animated.timing(this.state.y, {
        toValue: newY,
        duration: 300
      }).start();

    }

    moveTo(newX, newY, newBw, newIw, newOp, cI){

      if (!this.state.pureIndex){
        this.setState({pureIndex: cI});
      }



      if (newOp > 0.9){
        console.log(newOp);
        console.log("Set value to " + (cI + 1));
        global.cIdxVal = cI+1;
      }

      Animated.timing(this.state.x, {
        toValue: newX,
        duration: 300
      }).start();

      Animated.timing(this.state.y, {
        toValue: newY,
        duration: 300
      }).start();


      Animated.timing(this.state.ballWidth, {
        toValue: newBw,
        duration: 300
      }).start();


      Animated.timing(this.state.imageWidth, {
        toValue: newIw,
        duration: 300
      }).start();

      Animated.timing(this.state.itemOp, {
        toValue: newOp,
        duration: 300
      }).start();
    }






    render(){



      return (

        <Animated.View {...this.panRes.panHandlers} style={{...styles.circle, opacity: this.state.itemOp, left: this.state.x, top: this.state.y, width: this.state.ballWidth._value, height: this.state.ballWidth._value, borderRadius:  this.state.ballWidth._value/2, zIndex: this.state.cirIndex, backgroundColor: this.props.bgcolor}}>
          <Image style={{...styles.pimage, width: this.state.imageWidth._value, height: this.state.imageWidth._value }} source={this.props.logo}/>
        </Animated.View>


      )
    }

    updateGyro(result){
      this.setState({accX: result.y});
      this.setState({accY: result.x});


      this.setState({velX: this.state.velX+this.state.accX});
      this.setState({velY: this.state.velY+this.state.accY});

    }

    renderUpdate(){
      if (!this.state.isStaged) return;
      if (this.state.override){
        this.setState({x: this.state.originX+this.state.pan.x._value});
        this.setState({y: this.state.originY+this.state.pan.y._value});
      } else {
        this.setState({x: typeof this.state.x == "number" ? this.state.x + this.state.velX : this.state.x._value+this.state.velX});
        this.setState({y: typeof this.state.y == "number" ? this.state.y + this.state.velY :  this.state.y._value+this.state.velY});
      }



      const factor = this.state.ballWidth._value;

      if (this.state.x > width - factor){
        this.setState({velX: this.state.velX*-this.state.bounce});

      }

      if (this.state.y > 0 - factor ){
        this.setState({velY: this.state.velY*-this.state.bounce});


      }



      if (this.state.x < 0) {
        this.setState({velX: this.state.velX*-this.state.bounce});


      }



      if (this.state.blocking && this.state.y < (this.state.expanded ? 0 : height - 205)-(height-275-25)){

        this.setState({velY: this.state.velY*-this.state.bounce});

      }

    }



}


const styles = StyleSheet.create({

  circle: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",



  },



});

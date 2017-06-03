'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class ImageGulp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType : 'back',
      mirrorMode : false
    }
  }

  render() {
    return (
      <View style={styles.container}>
            <Camera
                ref={(cam) => {this.camera = cam;}}
                style={styles.preview}
                type={this.state.cameraType}
                mirrorImage={this.state.mirrorMode}
                aspect={Camera.constants.Aspect.fill}>

                <Text style={styles.capture} onPress={this.switchCameraType.bind(this)}>
                  [Switch Camera]
                </Text>

                <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)} underlayColor="rgba(255, 255, 255, 0.5)">
                    <View />
                </TouchableHighlight>

            </Camera>
      </View>
    );
  }

  switchCameraType() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirrorMode: true
      })
    } else {
      this.setState({
        cameraType: 'back',
        mirrorMode: false
      })
    }
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  }
});

export default ImageGulp
